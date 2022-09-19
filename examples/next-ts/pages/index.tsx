import { Code, Container, Heading, Text } from "@chakra-ui/react";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";

export default function IndexPage() {
  return (
    <>
      <Header />
      <Banner />
      <Container>
        <Heading size="md">Installation</Heading>
        <Text>install via npm/yarn:</Text>
        <Code>
          <pre>
{`npm install react-hook-headroom --save
yarn add react-hook-headroom`}
          </pre>
        </Code>

        <Heading size="md">What's it all about?</Heading>
        <Text>
          Headroom.js is a lightweight, high-performance JS widget (with no dependencies!) that allows you to react to the user's scroll. The header on this site is a living example, it slides out of view when scrolling down and slides back in when scrolling up.
        </Text>

        <Heading as="h3" size="sm">Why use it?</Heading>
        <Text>
          Fixed headers are a popular approach for keeping the primary navigation in close proximity to the user. This can reduce the effort required for a user to quickly navigate a site, but they are not without problems…
          Large screens are usually landscape-oriented, meaning less vertical than horizontal space. A fixed header can therefore occupy a significant portion of the content area. Small screens are typically used in a portrait orientation. Whilst this results in more vertical space, because of the overall height of the screen, a meaningfully-sized header can still be quite imposing.
          Headroom.js allows you to bring elements into view when appropriate, and give focus to your content the rest of the time.
        </Text>

        <Heading size="md">How does it work?</Heading>
        <Text>In response to scroll events, headroom.js adds and removes CSS classes to an element:</Text>
        <Code>
          <pre>
{`<!-- initially -->
<header class="headroom">

<!-- scrolling down -->
<header class="headroom headroom--unpinned">

<!-- scrolling up -->
<header class="headroom headroom--pinned">`}
          </pre>
        </Code>

        <Text>
          Relying on CSS classes affords headroom.js great flexibility. The choice of what to do when scrolling up or down is now entirely yours - anything you can do with CSS you can do in response to the user's scroll.
        </Text>
      </Container>
    </>
  );
}
