import type { SxProps, Theme } from '@mui/material';

export const getNavButtonStyles = (active: boolean = false): SxProps<Theme> => ({
  justifyContent: 'flex-start',
  width: '100%',
  pl: 3,
  color: active ? '#212121' : '#424242',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: active ? 500 : 400,
  backgroundColor: active ? '#f1f3f5' : 'transparent',
  '&:hover': {
    backgroundColor: '#f1f3f5',
  },
  '&::before': active
    ? {
        content: '""',
        position: 'absolute',
        left: 8,
        top: 5,
        bottom: 5,
        width: '4px',
        backgroundColor: '#212121',
        borderRadius: '4px',
      }
    : {},
});

export const getStaticNavButtonStyle = (active: boolean = false): SxProps<Theme> => ({
  justifyContent: 'flex-start',
  textTransform: 'none',
  fontWeight: active ? 600 : 500,
  color: active ? '#212121' : 'text.primary',
  borderRadius: '8px',
  backgroundColor: active ? '#f1f3f5' : 'transparent',
  '&:hover': {
    backgroundColor: '#f1f3f5',
  },
  px: 2,
  py: 1,
});