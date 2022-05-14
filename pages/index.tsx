import { Container, SkeletonText } from "@chakra-ui/react";
import { Header } from "../components/Header";

export default function IndexPage() {
  return (
    <>
      <Header />
      <Container>
        <SkeletonText mt='10' noOfLines={10} spacing='4' />
        <SkeletonText mt='10' noOfLines={10} spacing='4' />
        <SkeletonText mt='10' noOfLines={10} spacing='4' />
        <SkeletonText mt='10' noOfLines={10} spacing='4' />
        <SkeletonText mt='10' noOfLines={10} spacing='4' />
        <SkeletonText mt='10' noOfLines={10} spacing='4' />
      </Container>
    </>
  );
}
