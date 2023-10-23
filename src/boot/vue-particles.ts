import { boot } from 'quasar/wrappers';
import Particles from 'vue3-particles';
// import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export default boot(({ app }) => {
  app.use(Particles);

  // const particlesInit = async (engine: unknown) => {
  //   await loadFull(engine);
  //   // await loadSlim(engine);
  // };

  // const particlesLoaded = async (container: unknown) => {
  //   console.log('Particles container loaded', container);
  // };
});
