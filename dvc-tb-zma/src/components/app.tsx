import React from 'react'
import { Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AnimationRoutes, App, SnackbarProvider, ZMPRouter } from 'zmp-ui'

import DefaultLayout from '@/layouts/default-layout'
import NavigationBar from '@/layouts/navigation-bar/navigation-bar'
import HomePage from '@/pages'
import BuildingArticlePage from '@/pages/article-building'
import BuildingArticleDetailPage from '@/pages/article-building/detail'
import NewsArticlePage from '@/pages/article-news'
import NewsArticleDetailPage from '@/pages/article-news/detail'
import PostingArticlePage from '@/pages/article-posting'
import PostingArticleDetailPage from '@/pages/article-posting/detail'
import AudioPostingPage from '@/pages/article-posting/list-audio'
import ImagePostingPage from '@/pages/article-posting/list-image'
import ViewAudioPage from '@/pages/article-posting/view-audio'
import ViewImagePage from '@/pages/article-posting/view-image'
import PublicArticlePage from '@/pages/article-public'
import PublicArticleDetailPage from '@/pages/article-public/detail'
import CameraPage from '@/pages/camera'
import GoogleMapPage from '@/pages/google-map/google-map'
import HotlinePage from '@/pages/hotline'
import ListIndustryPage from '@/pages/industry-job/industry-infomation'
import IndustryDetailPage from '@/pages/industry-job/industry-infomation/detail'
import IndustryFormPage from '@/pages/industry-job/industry-infomation/form'
import JobPostingPage from '@/pages/industry-job/job-service'
import JobPostingDetailPage from '@/pages/industry-job/job-service/detail'
import FormJobPostingPage from '@/pages/industry-job/job-service/form'
import ListJobPostingPage from '@/pages/industry-job/job-service/list'
import MyJobPostingListPage from '@/pages/industry-job/job-service/my-list'
import PhanAnhPage from '@/pages/phan-anh-kien-nghi'
import PhanAnhDetailPage from '@/pages/phan-anh-kien-nghi/detail'
import Form from '@/pages/phan-anh-kien-nghi/form'
import PhanAnhCuaToiPage from '@/pages/phan-anh-kien-nghi/my-index'
import TraCuuPhanAnhPage from '@/pages/phan-anh-kien-nghi/search'
import SuccessMessage from '@/pages/phan-anh-kien-nghi/success'
import ProfilePage from '@/pages/profile'
import RatePage from '@/pages/rate'
import RateDevPage from '@/pages/rate-dev'
import SettingsPage from '@/pages/settings'
import CultureArticlePage from '@/pages/traditional-travel-food/article-culture'
import CultureArticleDetailsPage from '@/pages/traditional-travel-food/article-culture/details'
import FoodArticlePage from '@/pages/traditional-travel-food/article-food'
import FoodArticleDetailsPage from '@/pages/traditional-travel-food/article-food/details'
import TravelArticlePage from '@/pages/traditional-travel-food/article-travel'
import TravelArticleDetailsPage from '@/pages/traditional-travel-food/article-travel/details'
import { FirstVisitProvider } from '@/providers/first-visit-provider/FirstVisitProvider'

const MyApp: React.FC = () => {
  return (
    <RecoilRoot>
      <App>
        <FirstVisitProvider>
          <SnackbarProvider>
            <ZMPRouter>
              <AnimationRoutes>
                <Route element={<DefaultLayout />}>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/google-map' element={<GoogleMapPage />} />
                  <Route path='/phan-anh-kien-nghi'>
                    <Route index element={<PhanAnhPage />} />
                    <Route path='my-index' element={<PhanAnhCuaToiPage />} />
                    <Route path='form' element={<Form />} />
                    <Route path='form/camera' element={<CameraPage />} />
                    <Route path='search' element={<TraCuuPhanAnhPage />} />
                    <Route path='success' element={<SuccessMessage />} />
                    <Route path=':id' element={<PhanAnhDetailPage />} />
                  </Route>
                  <Route path='/to-giac-toi-pham/success' element={<SuccessMessage />} />
                  <Route path='/rate' element={<RatePage />} />
                  <Route path='/rate/dev' element={<RateDevPage />} />

                  <Route path='/job-posting'>
                    <Route index element={<JobPostingPage />} />
                    <Route path='list' element={<ListJobPostingPage />} />
                    <Route path='my-list' element={<MyJobPostingListPage />} />
                    <Route path=':id' element={<JobPostingDetailPage />} />
                    <Route path='form' element={<FormJobPostingPage />} />
                  </Route>

                  <Route path='/industry-posting'>
                    <Route index element={<ListIndustryPage />} />
                    <Route path=':id' element={<IndustryDetailPage />} />
                    <Route path='form' element={<IndustryFormPage />} />
                  </Route>

                  <Route path='/article-news'>
                    <Route index element={<NewsArticlePage />} />
                    <Route path=':id' element={<NewsArticleDetailPage />} />
                  </Route>
                  <Route path='/article-building'>
                    <Route index element={<BuildingArticlePage />} />
                    <Route path=':id' element={<BuildingArticleDetailPage />} />
                  </Route>
                  <Route path='/article-food'>
                    <Route index element={<FoodArticlePage />} />
                    <Route path=':id' element={<FoodArticleDetailsPage />} />
                  </Route>
                  <Route path='/article-travel'>
                    <Route index element={<TravelArticlePage />} />
                    <Route path=':id' element={<TravelArticleDetailsPage />} />
                  </Route>
                  <Route path='/article-culture'>
                    <Route index element={<CultureArticlePage />} />
                    <Route path=':id' element={<CultureArticleDetailsPage />} />
                  </Route>
                  <Route path='/article-public'>
                    <Route index element={<PublicArticlePage />} />
                    <Route path=':id' element={<PublicArticleDetailPage />} />
                  </Route>
                  <Route path='/my-posting'>
                    <Route index element={<PostingArticlePage />} />
                    <Route path=':id' element={<PostingArticleDetailPage />} />
                    <Route path='images' element={<ImagePostingPage />} />
                    <Route path='images/:id' element={<ViewImagePage />} />
                    <Route path='audio' element={<AudioPostingPage />} />
                    <Route path='audio/:id' element={<ViewAudioPage />} />
                  </Route>

                  <Route path='/hotline' element={<HotlinePage />} />
                  <Route path='/settings' element={<SettingsPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                </Route>
              </AnimationRoutes>
              <NavigationBar />
            </ZMPRouter>
          </SnackbarProvider>
        </FirstVisitProvider>
      </App>
    </RecoilRoot>
  )
}

export default MyApp
