
import Container from './components/container'




export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <Container>
              {/* <NuxtPage /> */}
          </Container>
      </>
    );
  }
});
// <script lang="ts">

// </script>
// <template>
// <!-- <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}> -->
//       <Head>
//         <meta content="width=device-width, initial-scale=1" name="viewport" />
//       </Head>
//       <Analytics analyticsConfig={siteMetadata.analytics} />
//       <Container>
//         <SearchProvider searchConfig={siteMetadata.search}>
//           <Component {...pageProps} />
//         </SearchProvider>
//       </Container>
// <!-- </ThemeProvider> -->
//   <div>
    
//   </div>
// </template>
