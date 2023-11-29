<template>
  <header>
    <nav>
      <nuxt-link to="/">
        <img src="../assets/images/bourges2028.png" alt="" />
      </nuxt-link>
      <label for="menu" @click="greet"
        ><img src="~/assets/images/burger-menu-svgrepo-com.svg" alt=""
      /></label>
      <input id="menu" type="checkbox" v-model="menu" />
      <ul @click="fermer">
        <li v-for="menu in data?.menu?.data?.attributes?.menu" :key="menu.id">
          <nuxt-link
            :to="
              menu.slug && menu.submenu.length == 0
                ? menu.slug == '/'
                  ? '/'
                  : `/${menu.slug}`
                : ''
            "
            class="menuItem"
            >{{ menu.name }}</nuxt-link
          >
          <ul class="mobile_menu">
            <li v-for="subItem in menu.submenu" class="submenuItem">
              <nuxt-link
                :to="
                  subItem.slug
                    ? `/${subItem.slug}`
                    : subItem?.page?.data?.attributes?.slug
                    ? `/${subItem?.page?.data?.attributes?.slug}`
                    : ''
                "
                v-if="subItem.page"
                ><span v-html="subItem.name" />
              </nuxt-link>
            </li>
          </ul>
          <div class="popup__menu" v-if="menu.submenu.length > 0">
            <ul>
              <li v-for="subItem in menu.submenu" class="submenuItem">
                <nuxt-link
                  :to="
                    subItem.slug
                      ? `/${subItem.slug}`
                      : subItem?.page?.data?.attributes?.slug
                      ? `/${subItem?.page?.data?.attributes?.slug}`
                      : ''
                  "
                  v-if="subItem.page"
                  ><span v-html="subItem.name" />
                </nuxt-link>

                <div class="popup__preview__submenu">
                  <div
                    class="copy"
                    v-if="
                      subItem.page?.data?.attributes?.image?.data?.attributes
                        ?.caption
                    "
                  >
                    {{
                      subItem.page?.data?.attributes?.image?.data?.attributes
                        ?.caption
                    }}
                  </div>
                  <img
                    v-if="
                      subItem.page?.data?.attributes?.image?.data?.attributes
                        ?.url
                    "
                    class="popup__preview__img"
                    :src="`${baseUrlApi}${subItem.page?.data?.attributes?.image?.data?.attributes?.url}`"
                  />
                </div>
              </li>
            </ul>
            <div class="popup__preview">
              <div class="copy">
                <img src="../assets/images/bourges2028-icon-green.png" alt="" />
              </div>
            </div>
          </div>
        </li>
        <button @click="changeLanguage">
          <span v-if="language == 'fr'">EN</span>
          <span v-else>FR</span>
        </button>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import Cookies from "js-cookie";
import { useI18n, useLocalePath } from "#imports";

const { locale } = useI18n();
const route = useRoute();
const query = gql`
  query ($locale: I18NLocaleCode) {
    menu(locale: $locale) {
      data {
        attributes {
          menu {
            id
            name
            page {
              data {
                attributes {
                  slug
                  image {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            submenu {
              id
              slug
              page {
                data {
                  attributes {
                    slug
                    image {
                      data {
                        attributes {
                          url
                          caption
                        }
                      }
                    }
                  }
                }
              }
              name
            }
            slug
          }
        }
      }
    }
  }
`;
const language = Cookies.get("i18n_language") || "fr";

const { data } = await useAsyncQuery(query, {
  locale: language,
});

// Comment this below code


// This code block is mounted when the component navbar.vue is mounted. 
// It checks the current path name and if it is "/rer-europa", 
// it checks the language and displays the appropriate language element. 
onMounted(() => {
  const pathName = document.location.pathname;
  if (pathName === "/rer-europa") {
    if (language == "fr") {
      document.getElementById("fr").style.display = "block";
      document.getElementById("en").style.display = "none";
    } else {
      document.getElementById("fr").style.display = "none";
      document.getElementById("en").style.display = "block";
    }
  }
});


// This code block is mounted when the component navbar.vue is mounted. 
// It checks the current path name and if it is "/rer-europa", 
// it checks the language and displays the appropriate language element. 
// onMounted(() => {
  // const pathName = document.location.pathname;
  // if (pathName === "/rer-europa") {
  //   console.log(document.getElementById("en"));
  //   console.log(document.getElementById("fr"));
  //   if (language == "fr" && ( document.getElementById("fr") || document.getElementById("en"))) {
  //     console.log(language);
  //     document.getElementById("fr").style.display = "block";
  //     document.getElementById("en").style.display = "none";
  //   } else {
  //     document.getElementById("fr").style.display = "none";
  //     document.getElementById("en").style.display = "block";
  //   }
  // }
// });
/**
 * Function to change the language of the website and reload the page.
 * It also deletes messages from cookies and hides/shows the appropriate language container 
 * based on the selected language.
 * @param {Event} e - The event object.
 */
const changeLanguage = (e) => {
  // delete messages from cookies
  Cookies.remove("messages");
  Cookies.set("i18n_language", language == "fr" ? "en" : "fr");
  window.location.reload();

  // const pathName = document.location.pathname;
  // if (pathName === "/rer-europa") {
  //   if (language == "fr") {
  //     document.getElementById("fr").style.display = "block";
  //     document.getElementById("en").style.display = "none";
  //   } else {
  //     document.getElementById("fr").style.display = "none";
  //     document.getElementById("en").style.display = "block";
  //   }
  // }
};

const baseUrlApi =
  process.env.VUE_APP_BASE_URL_API || "https://backoffice.bourges2028.org";

const menu = ref(false);
// when navigate to another page, close the menu
watch(
  () => route.path,
  () => {
    console.log('watch');
    menu.value = false;
  }
);
watch(
  () => language,
  () => {
    Cookies.set("i18n_language", language);
  }
);
</script>

<style lang="scss" scoped>
.hidden {
  display: none !important;
}

button {
  background: none;
  border: none;
  margin: 0 20px;
  font-weight: bold;
}
header {
  z-index: 100;
  position: absolute;
  height: 100px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(22px);
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    max-width: 100%;
    display: flex;
    gap: 50px;
    align-items: center;
    a {
      position: absolute;
      left: 10px;

      padding: 10px;
      img {
        height: 80px;
      }
    }
    height: 100%;
    ul {
      display: flex;
      height: 100%;
      li {
        height: 100%;
        list-style: none;
        a {
          font-weight: bold;
          font-size: 14px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          height: 100%;
          color: var(--black);
          position: relative;

          &.menuItem::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            height: 4px;
            width: 100%;
            background-color: var(--green);
            transform: scaleX(0);
            transition: transform 0.3s ease;
            transform-origin: right;
          }

          &:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      }
    }
  }

  .popup__preview__submenu {
    opacity: 0;
    z-index: 1000;
    transition: opacity 0.5s ease;
  }

  .submenuItem:hover {
    .popup__preview__submenu {
      opacity: 1;
    }
  }
  .popup__preview__submenu {
    position: absolute;
    width: calc(100% - 400px);
    top: 0;
    left: 400px;
    right: 0;
    bottom: 0;
    .copy {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px;
      font-size: 12px;
      text-align: center;
      color: black;
      background-color: white;
    }
  }
  .popup__preview__img {
    height: 100%;
    top: 0;
    left: 400px;
    right: 0;
    bottom: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .popup__menu {
    pointer-events: none;
    opacity: 0;

    max-width: 1000px;
    width: 80vw;
    min-height: 500px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);

    color: white;
    background-color: var(--green);
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    // transition: opacity 0.1s ease;
    display: flex;
    flex-direction: row;
    ul {
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 20px;
      width: 400px;
      li {
        a {
          color: white;
          display: block;
          padding: 10px;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }
      }
      li a:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
    .popup__preview {
      position: relative;
      flex: 1;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .copy {
        padding: 8px;
        font-size: 12px;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background-color: white;
        color: black;
        img {
          width: 40px;
          object-fit: contain;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  li:hover .popup__menu,
  .popup__menu:hover {
    opacity: 1;
    pointer-events: all;
  }
}

.mobile_menu {
  display: none;
}

@media screen and (min-width: 1080px) {
  #menu,
  label {
    display: none;
  }
}
@media screen and (max-width: 1080px) {
  header {
    // background: transparent;
    // backdrop-filter: none;
    height: auto !important;
  }
  .mobile_menu {
    display: block;
  }
  header,
  nav {
    height: max-content;
    width: 100vw;
    z-index: 100000;
  }
  header {
    background-color: rgba(211, 211, 211, 1);
    nav {
      flex-direction: column;
      gap: 0;
      max-width: 100%;
      overflow: hidden;
      ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        gap: 10px;

        li {
          height: auto;
          a {
            font-size: 16px;
          }
        }
      }
    }
  }
  header nav > ul {
    position: relative;
    background-color: var(--green);
    z-index: 10000;
    gap: 20px;
    padding: 20px 0;
    color: white !important;
    pointer-events: none;
    display: none;
    > li > a {
      text-decoration: underline;
    }
    ul {
      position: relative;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      a {
        font-weight: normal;
      }
    }
  }
  header nav > input:checked + ul {
    pointer-events: all;
    display: flex;
  }
  header nav {
    a {
      position: relative;
    }
  }
  header .popup__menu {
    display: none;
  }
  header nav ul li a {
    height: auto;
    color: white !important;
    margin: 4px 0;
  }
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  nav > {
    a {
      margin-right: auto;
      img {
        height: 60px !important;
      }
    }
    label {
      position: absolute;
      top: 50px;
      right: 20px;
      transform: translateY(-50%);
      img {
        height: 40px;
      }
    }
  }
  button {
    color: white;
  }
}
</style>
