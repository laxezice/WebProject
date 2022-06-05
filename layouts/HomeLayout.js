import { Box } from "@mui/material";
import BaseLayout from "./BaseLayout";
export default function HomeLayout({ children }) {
  return (
    <BaseLayout>
      <Box sx={{ height: "95%", boxSizing: "border-box" }} pt={1}>
        <Box sx={{ width: "100%", height: "100%", overflowY: "auto" }}>
          {children}
        </Box>
      </Box>
    </BaseLayout>
  );
}
