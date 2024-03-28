import { Flex, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[30rem]">
      <Flex direction="column" gap="8" justify="center" align="center">
        <Flex direction="column" gap="1" justify="center" align="center">
          <Heading
            as="h1"
            size={{
              initial: "7",
              md: "8",
              xl: "9",
            }}
          >
            Welcome to Trakifyr!
          </Heading>
          <Text
            size={{
              initial: "3",
              md: "4",
              xl: "4",
            }}
          >
            Simplify Your Issue Tracking Process
          </Text>
        </Flex>
        <Text size="3" align="center">
          Streamline your workflow and conquer project chaos. Our issue tracking
          app provides a central dashboard, effortless issue creation and
          editing, a comprehensive list with advanced filtering, and
          collaborative features to boost productivity, communication, and
          transparency. Experience the power of efficient issue management!
        </Text>
      </Flex>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Trakifyr - Home",
  description: "Home page of the Trakifyr application.",
};
