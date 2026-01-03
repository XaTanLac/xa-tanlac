import React, { useCallback, useMemo } from 'react'
import { Box, Modal, useNavigate, useSearchParams } from 'zmp-ui'

import { IMenuActionProps } from '@/constants'

import IconButton from './icon-button'

interface IModalMenuProps {
  title: string
  paramVisible: string
  items: IMenuActionProps[]
}

const ModalMenu: React.FC<IModalMenuProps> = ({ title, paramVisible, items }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const isModal = useMemo(() => searchParams.get(paramVisible) === 'true', [paramVisible, searchParams])

  const handleOnClick = useCallback(
    (item: IMenuActionProps): void => {
      navigate('', { replace: true })
      item.action({ navigate })
    },
    [navigate],
  )

  return (
    <Modal
      title={title}
      visible={isModal}
      actions={[
        {
          text: 'Đóng',
          onClick: () => navigate(''),
        },
      ]}
    >
      <Box mt={5}>
        <Box className='!grid gap-4 grid-cols-[repeat(auto-fit,minmax(80px,1fr))]'>
          {items.map((item) => (
            <Box key={item.id} className='!py-2'>
              <IconButton title={item.title} icon={item.icon} onClick={() => handleOnClick(item)} />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalMenu
