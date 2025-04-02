<template>
  <section class="overflow-hidden bg-slate-300">
  
  </section>
</template>

<script setup lang="js">

const works = ref();

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const transformWorkObject = (contactData) => {
  return contactData.map((data) => {
    const { image, prenom, nom, telephone, ...otherAttributes } = data.attributes;
    const telephoneString = telephone.toString();
    const telephoneTransformed = `+33 ${telephoneString.charAt(0)} ${telephoneString.slice(1).match(/.{1,2}/g).join(' ')}`;

    let url = image.data.attributes.url;
    let lastPart = url.split("/").pop();

    return {
      ...otherAttributes,
      prenom: capitalizePrenom(prenom),
      nom: nom.toUpperCase(),
      telephone: telephoneTransformed,
      contactPhotoUrl: "/backoffice/" + lastPart,
    };
  });
};

const getWorks = async () => {
  // const url = `${strapiBaseUrl}/works?populate=*`;
  const url = `${strapiBaseUrl}/works?populate[Content][on][works-content.title-image][populate][Image]=*&populate[Hero][on][hero.title-sub-title]=*`;

  const { data, pending, error } = await useAsyncData("works", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

  if (!error.value && !pending.value && data.value) {
    // works.value = transformWorkObject(data.value.data);
    console.log(data.value.data);
  } else {
    console.error(error.value);
  }
};

getWorks();
</script>
