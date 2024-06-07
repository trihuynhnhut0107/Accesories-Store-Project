// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import { VNumberInput } from "vuetify/labs/VNumberInput";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    components: {
      VNumberInput,
      VDateInput,
    },
  });
  app.vueApp.use(vuetify);
});
