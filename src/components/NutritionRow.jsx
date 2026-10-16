
import { Box, Typography, Divider } from '@mui/material';

function NutritionRow({ label, value, unit = '' }) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          py: 1.5,
        }}
      >
        <Typography>{label}</Typography>
        <Typography fontWeight="bold">
          {value} {unit}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}

export default NutritionRow;
