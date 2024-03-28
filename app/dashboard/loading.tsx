import { Skeleton } from "@/app/components";
import { Box, Flex, Grid } from "@radix-ui/themes";

const LoadingDashboardPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="7">
      <Box className="max-w-xl">
        <Flex gap="5" my="2">
          <Skeleton width="5rem" height="4rem" />
          <Skeleton width="5rem" height="4rem" />
          <Skeleton width="5rem" height="4rem" />
        </Flex>
        <Skeleton width="100%" height="23rem" />
      </Box>
      <Box>
        <Skeleton width="100%" height="28rem" />
      </Box>
    </Grid>
  );
};

export default LoadingDashboardPage;
