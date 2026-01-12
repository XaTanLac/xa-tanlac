import React, { useEffect, useMemo, useState } from 'react'
import { AppError, followOA, getUserInfo, openProfile } from 'zmp-sdk'
import { Box, Button, Center, Icon, Page, Sheet, Spinner, Swiper, Text, useNavigate, useSnackbar } from 'zmp-ui'
import Banner from '@/assets/images/banner.jpg'
import logoOA from '@/assets/images/logo.jpg'
import IconButton from '@/components/icon-button'
import ModalMenu from '@/components/modal-menu'
import MovingButton from '@/components/moving-button'
import { FilterTime, gridItems, labelFilterTime, menuItems, modalMenuItems, OA_ID } from '@/constants'
import { NEWS_API } from '@/constants/endpoint'
import { IArticle, useArticleMemo } from '@/hooks/use-article'
import useAssessmentsMemo from '@/hooks/use-assessment'
import useBannersMemo from '@/hooks/use-banners'
import useVisitorMemo from '@/hooks/use-visitor'
import HomeHeader from '@/layouts/home-header'
import { formatDateDDMMYYYYhhmm, getDateRange } from '@/utils/string-handler'

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const oaId = useMemo(() => OA_ID, [])
  const [checkFollow, setCheckFollow] = useState(false)
  const [isSheetVisible, setIsSheetVisible] = useState(false)
  const [currentTypeTime, setCurrentTypeTime] = useState<FilterTime>(FilterTime.TODAY)

  const userVisitedActions = useMemo(
    () => [
      {
        type: FilterTime.TODAY,
        title: labelFilterTime[FilterTime.TODAY],
        timeLine: { start: new Date(), end: new Date() },
      },
      {
        type: FilterTime.WEEKLY,
        title: labelFilterTime[FilterTime.WEEKLY],
        timeLine: getDateRange('week'),
      },
      {
        type: FilterTime.MONTHLY,
        title: labelFilterTime[FilterTime.MONTHLY],
        timeLine: getDateRange('month'),
      },
    ],
    [],
  )

  const getTimeFilter = useMemo(() => {
    const action = userVisitedActions.find((item) => item.type === currentTypeTime)

    if (currentTypeTime === FilterTime.TODAY) {
      return {
        timeVisit: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
          $lte: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
        },
      }
    }

    return {
      timeVisit: {
        $gte: action?.timeLine.start.toISOString(),
        $lte: action?.timeLine.end.toISOString(),
      },
    }
  }, [currentTypeTime, userVisitedActions])

  const [numberOfVisits, loadingNumberOfVisits] = useVisitorMemo(
    '/api/number-of-visits',
    {
      filters: {
        ...getTimeFilter,
      },
    },
    [currentTypeTime],
  )

  const bannerImages = useBannersMemo(
    {
      populate: '*',
    },
    [],
  )

  const [linkGoogleForm] = useAssessmentsMemo(
    {
      pagination: {
        page: 1,
        pageSize: 1,
      },
      sort: ['createdAt:desc'],
    },
    [],
  )

  const [topNewsData, setTopNewsData] = useState<IArticle[]>()
  const [topNews, topNewsLoading] = useArticleMemo<IArticle[]>(
    NEWS_API.LIST,
    {
      pagination: {
        limit: 7,
      },
      filters: {
        isTopNews: {
          $eq: true,
        },
      },
      populate: '*',
      sort: ['createdAt:desc'],
    },
    [],
  )

  const handleLienHe = async (): Promise<void> => {
    try {
      await openProfile({
        id: oaId,
        type: 'oa',
      })
    } catch (error) {
      openSnackbar({
        text: 'Lỗi mở hồ sơ',
        type: 'error',
      })
    }
  }

  const handleFollowOA = async (): Promise<void> => {
    try {
      await followOA({
        id: oaId,
      })
      const { userInfo } = await getUserInfo({ autoRequestPermission: true })
      setCheckFollow(userInfo.followedOA ?? false)
      openSnackbar({
        text: 'Theo dõi thành công',
        type: 'success',
      })
    } catch (error) {
      const code = (error as AppError).code
      if (code === -201) {
        openSnackbar({
          text: 'Đã từ chối theo dõi',
          type: 'info',
        })
      } else {
        openSnackbar({
          text: 'Lỗi...',
          type: 'info',
        })
      }
    }
  }

  const handleChangeTimeType = (type: FilterTime): void => {
    setCurrentTypeTime(type)
  }

  useEffect(() => {
    if (!topNewsLoading && topNews) {
      setTopNewsData(topNews)
    }
  }, [topNews, topNewsLoading])
  useEffect(() => {
    const checkUserFollow = async (): Promise<void> => {
      try {
        const { userInfo } = await getUserInfo({ autoRequestPermission: false })
        setCheckFollow(userInfo.followedOA ?? false)
      } catch (error) {
        setCheckFollow(false)
      }
    }

    checkUserFollow()
  }, [])

  return (
    <Page className='relative' hideScrollbar>
      <HomeHeader />
      <Box mb={2} mt={4} flex alignItems='center' flexDirection='column' className='relative'>
        {bannerImages && bannerImages.length > 0 ? (
          <Swiper autoplay={false} loop={false} dots={false} className='!rounded-none !h-60'>
            {bannerImages?.map((image) => (
              <Swiper.Slide key={image.hash} className='relative'>
                <img src={image.url} alt={image.alternativeText || image.name} />
              </Swiper.Slide>
            ))}
          </Swiper>
        ) : (
          <Box className='w-full !h-60 !flex items-center justify-center'>
            <Spinner />
          </Box>
        )}
        {
          // ---------------- MAIN MENU -----------------------
        }
        <Box
          flex
          justifyContent='space-around'
          className='bg-white w-[calc(100%-1.5rem)] rounded-xl absolute -bottom-16'
          py={4}
        >
          {menuItems.map((item) => (
            <IconButton
              key={item.id}
              title={item.title}
              icon={item.icon}
              onClick={() => item.action({ navigate: navigate })}
            />
          ))}
        </Box>
      </Box>
      <Box className='z-[99] !absolute right-4 top-14 -translate-y-1/2'>
        <MovingButton
          className='h-auto w-auto p-2 !rounded-lg flex items-center gap-2 shadow-black/50 bg-[#0979f1] bg-gradient-to-b from-[#3a98ff] via-[#0979f1] to-[#0059c0] shadow-[0_4px_8px_rgba(0,0,0,0.2)] text-xs text-white'
          dragConstraints={{
            top: -10,
            left: 130 - window.innerWidth,
            right: 0,
            bottom: window.innerHeight,
          }}
          onClick={() => setIsSheetVisible(true)}
        >
          <Icon icon='zi-group-solid' size={32} />
          <div className='font-bold flex flex-col '>
            <span>{labelFilterTime[currentTypeTime]}</span>
            {!loadingNumberOfVisits ? (
              <span>{numberOfVisits}</span>
            ) : (
              <div className='h-4 w-full animate-pulse rounded-sm bg-white/50'></div>
            )}
          </div>
        </MovingButton>
      </Box>
      {
        // ---------------- GRID MENU -----------------------
      }
      <Box className='!mt-20'>
        <Center className='bg-white py-6 rounded-t-xl' gutters='1rem'>
          <div className='!grid gap-4 grid-cols-[repeat(auto-fit,minmax(80px,1fr))]'>
            {gridItems.map((item) => (
              <IconButton
                key={item.id}
                title={item.title}
                icon={item.icon}
                isBackground
                onClick={() => item.action({ navigate: navigate, link: linkGoogleForm[0].google_form_link })}
              />
            ))}
          </div>
        </Center>
      </Box>
      {
        // ---------------- LIÊN HỆ OA -----------------------
      }
      <Box mt={2} className='bg-white' px={4} py={5}>
        <Box className='border-b border-gray' pb={3} mb={3}>
          <Text size='xxSmall' className='text-gray-500'>
            Liên hệ trang Zalo OA chính danh của xã Tân Lạc
          </Text>
        </Box>
        <Box flex alignItems='center' justifyContent='space-between'>
          <Box flex alignItems='center' className='gap-2'>
            <img src={logoOA} alt='logo' width={32} />
            <Box flex flexDirection='column'>
              <Text size='large' bold>
                Xã Tân Lạc
              </Text>
              <Text size='xxSmall' className='text-gray-500'>
                Tài khoản OA
              </Text>
            </Box>
          </Box>
          {checkFollow ? (
            <Button onClick={handleLienHe} size='small'>
              Liên hệ
            </Button>
          ) : (
            <Button onClick={handleFollowOA} size='small'>
              Quan tâm
            </Button>
          )}
        </Box>
      </Box>
      {
        // ---------------- TIN TỨC NỔI BẬT -----------------------
      }
      {topNewsData && topNewsData?.length > 0 && (
        <Box flex flexDirection='column' mt={2} className='bg-white' pb={5}>
          <Text size='xLarge' bold className='text-center p-5'>
            Tin tức nổi bật
          </Text>
          <Swiper
            autoplay
            loop
            dots={false}
            style={{
              padding: '0px calc((100% - 316px)/2)',
            }}
          >
            {topNewsData?.map((new_item) => (
              <Swiper.Slide className='!w-[300px] !min-w-[300px] mx-2' key={new_item.documentId}>
                <Box
                  flex
                  flexDirection='column'
                  className='gap-3'
                  onClick={() => navigate(`/article-news/${new_item.documentId}`)}
                >
                  <img src={new_item.imgBanner?.url} alt='slide-1' className='h-40 rounded-md pointer-events-none' />
                  <Text size='small' bold className='pointer-events-none'>
                    <div className='line-clamp-3 overflow-hidden text-ellipsis text-wrap text-center'>
                      {new_item.title}
                    </div>
                  </Text>
                </Box>
              </Swiper.Slide>
            ))}
          </Swiper>
        </Box>
      )}
      {
        // ---------------- MODAL MENU -----------------------
      }
      {modalMenuItems.map((item) => (
        <ModalMenu key={item.title} title={item.title} paramVisible={item.param} items={item.item} />
      ))}
      <Sheet.Actions
        actions={[
          ...[
            userVisitedActions.map((action) => ({
              close: true,
              onClick: () => handleChangeTimeType(action.type),
              text: (
                <Box>
                  <Text size='xLarge' className='font-semibold'>
                    {action.title}
                  </Text>
                  {FilterTime.TODAY !== action.type ? (
                    <Text size='xxSmall' className='text-gray-500 mt-1'>
                      {formatDateDDMMYYYYhhmm(action.timeLine.start, false)} -{' '}
                      {formatDateDDMMYYYYhhmm(action.timeLine.end, false)}
                    </Text>
                  ) : (
                    <Text size='xxSmall' className='text-gray-500 mt-1'>
                      {formatDateDDMMYYYYhhmm(action.timeLine.start, false)}
                    </Text>
                  )}
                </Box>
              ) as unknown as string,
            })),
          ],
          [
            {
              close: true,
              danger: true,
              text: 'Hủy',
            },
          ],
        ]}
        title='Hiển thị lượt truy cập theo'
        mask
        swipeToClose
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
      />
    </Page>
  )
}

export default HomePage
