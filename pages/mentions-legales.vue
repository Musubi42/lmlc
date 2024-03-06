<template>
  <div class="bg-gray-100 pt-10">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">{{ legalNotice }}</h1>

      <p class="mb-4">
        {{ introduction }}
      </p>

      <section class="mt-10">
        <h2 class="text-2xl font-bold mb-2">{{ owner }}</h2>

        <h3 class="text-xl font-semibold mb-1">{{ ownerName }}</h3>

        <ul class="list-disc list-inside mb-4">
          <li>{{ ownerLegalForm }}</li>
          <li>{{ ownerCapital }}</li>
          <li>{{ ownerLocation }}</li>
          <li>{{ ownerSiret }}</li>
          <li>{{ ownerRcs }}</li>
          <li>{{ ownerCodeNafApe }}</li>
          <li>{{ ownerDirectorPublication }}</li>
        </ul>  
      </section>

      <section class="mt-10">
        <h2 class="text-2xl font-bold mb-2">{{ dev }}</h2>

        <p class="mb-4">
          <span>{{ devArthur }}</span>
          <br>
          <span>{{ devArthurContact }}</span>
        </p>
      
        <p class="mb-4">
          <span>{{ devRaphael }}</span>
          <br>
          <span>{{ devRaphaelContact }}</span>
        </p>
      </section>

      <section class="mt-10">
        <h2 class="text-2xl font-bold mb-2">{{ hosting }}</h2>

        <h3 class="text-xl font-semibold mb-1">{{ hostingName }}</h3>

        <p class="mb-4">
          {{ hostingNote }}
        </p>
      </section>  

      <section class="mt-10">
        <h2 class="text-2xl font-bold mb-2">{{ cookies }}</h2>

        <p class="mb-4">
          {{ cookiesContent }}
        </p>

        <h3 class="text-xl font-semibold mb-1">{{ cookiesWhat }}</h3>
        <p>{{ cookiesWhatContent }}</p>

        <h3 class="text-xl font-semibold mb-1">{{ cookiesHow }}</h3>
        <span>{{ cookiesHowContentOne }}</span>
        <ul>
          <li>{{ cookiesHowContentTwo }}</li>
          <li>{{ cookiesHowContentThree }}</li>
        </ul>
      </section>

      <section class="mt-10">
        <h2 class="text-2xl font-bold mb-2">{{ consent }}</h2>

        <p class="mb-4">
          {{ consentContent }}
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    useSeoMeta({
      title: 'LMLC COMMUNICATION',
      ogTitle: 'My Amazing Site',
      description: 'This is my amazing site, let me tell you all about it.',
      ogDescription: 'This is my amazing site, let me tell you all about it.',
      ogImage: 'https://example.com/image.png',
      twitterCard: 'summary_large_image',
    });
  },
  data() {
    return {
      introduction: this.$t("introduction"),
      legalNotice: this.$t("legalNotice"),
      owner: this.$t("owner"),
      ownerName: this.$t("ownerName"),
      ownerLegalForm: this.$t("ownerLegalForm"),
      ownerCapital: this.$t("ownerCapital"),
      ownerLocation: this.$t("ownerLocation"),
      ownerSiret: this.$t("ownerSiret"),
      ownerRcs: this.$t("ownerRcs"),
      ownerCodeNafApe: this.$t("ownerCodeNafApe"),
      ownerDirectorPublication: this.$t("ownerDirectorPublication"),
      dev: this.$t("dev"),
      devArthur: this.$t("devArthur"),
      devArthurContact: this.$t("devArthurContact"),
      devRaphael: this.$t("devRaphael"),
      devRaphaelContact: this.$t("devRaphaelContact"),
      hosting: this.$t("hosting"),
      hostingName: this.$t("hostingName"),
      hostingNote: this.$t("hostingNote"),
      intellectualProperty: this.$t("intellectualProperty"),
      intellectualPropertyContent: this.$t("intellectualPropertyContent"),
      cookies: this.$t("cookies"),
      cookiesContent: this.$t("cookiesContent"),
      cookiesWhat: this.$t("cookiesWhat"),
      cookiesWhatContent: this.$t("cookiesWhatContent"),
      cookiesHow: this.$t("cookiesHow"),
      cookiesHowContentOne: this.$t("cookiesHowContentOne"),
      cookiesHowContentTwo: this.$t("cookiesHowContentTwo"),
      cookiesHowContentThree: this.$t("cookiesHowContentThree"),
      consent: this.$t("consent"),
      consentContent: this.$t("consentContent"),
    }
  },

  mounted() {
    // Get the language change of SwitchLanguage component
    watch(() => this.$i18n.locale, () => {
      this.setLanguageTexts();
    });
  },

  methods: {
   setLanguageTexts() {
      this.introduction =  this.$t("introduction");
      this.legalNotice =  this.$t("legalNotice");
      this.owner =  this.$t("owner");
      this.ownerName =  this.$t("ownerName");
      this.ownerLegalForm =  this.$t("ownerLegalForm");
      this.ownerCapital =  this.$t("ownerCapital");
      this.ownerLocation =  this.$t("ownerLocation");
      this.ownerSiret =  this.$t("ownerSiret");
      this.ownerRcs =  this.$t("ownerRcs");
      this.ownerCodeNafApe =  this.$t("ownerCodeNafApe");
      this.ownerDirectorPublication =  this.$t("ownerDirectorPublication");
      this.dev =  this.$t("dev");
      this.devArthur =  this.$t("devArthur");
      this.devArthurContact =  this.$t("devArthurContact");
      this.devRaphael =  this.$t("devRaphael");
      this.devRaphaelContact =  this.$t("devRaphaelContact");
      this.hosting =  this.$t("hosting");
      this.hostingName =  this.$t("hostingName");
      this.hostingNote =  this.$t("hostingNote");
      this.intellectualProperty =  this.$t("intellectualProperty");
      this.intellectualPropertyContent =  this.$t("intellectualPropertyContent");
      this.cookies =  this.$t("cookies");
      this.cookiesContent =  this.$t("cookiesContent");
      this.cookiesWhat =  this.$t("cookiesWhat");
      this.cookiesWhatContent =  this.$t("cookiesWhatContent");
      this.cookiesHow =  this.$t("cookiesHow");
      this.cookiesHowContentOne =  this.$t("cookiesHowContentOne");
      this.cookiesHowContentTwo =  this.$t("cookiesHowContentTwo");
      this.cookiesHowContentThree =  this.$t("cookiesHowContentThree");
      this.consent =  this.$t("consent");
      this.consentContent =  this.$t("consentContent");
    }, 
  }
}
</script>
