<template>
  <q-page
    class="q-px-md q-pt-md q-pb-md row wrap items-start content-start q-mx-auto q-my-none"
    style="max-width: 1024px"
    id="particles-js"
  >
    <!-- <router-view style="max-width: 1024px" class="q-mx-auto q-my-none" /> -->

    <!-- intro block start -->
    <div
      class="col-12 items-stretch row bg-greys-5 rounded-borders background-image"
    >
      <q-img
        src="https://loremflickr.com/300/400"
        :ratio="3 / 4"
        class="rounded-borders full-height col-12 col-sm-4 col-md-3"
        style="max-height: calc(100vh - 50px - $space-md)"
      >
        <div v-if="$q.screen.lt.sm" class="absolute-bottom">
          <scalable-text
            value="Konstantin Serebryakov"
            class="text-h1 text-no-wrap non-selectable text-weight-bolder"
          ></scalable-text>
          <scalable-text
            value="JavaScript developer"
            class="text-h5 text-no-wrap non-selectable"
          ></scalable-text>
        </div>
      </q-img>
      <div v-if="$q.screen.gt.xs" class="col-12 col-sm content-around row">
        <!-- <div class="col-12" style="background-color: rgba(0, 0, 0, 0.47)"> -->
        <div class="col-12">
          <scalable-text
            value="Namee and anawfawfawfaw"
            class="text-h1 text-no-wrap non-selectable text-weight-bolder rounded-borders"
          ></scalable-text>
          <scalable-text
            value="JavaScript developer"
            class="text-h5 text-no-wrap non-selectable text-weight-bolder"
          ></scalable-text>
        </div>
        <div class="col-12"></div>
      </div>
    </div>
    <!-- intro block end -->
    <!-- main description block start -->
    <div class="col-12 items-stretch row bg-grey rounded-borders q-mt-md">
      contacts
    </div>
    <!-- main description block end -->
  </q-page>
</template>

<script lang="ts">
import ScalableText from 'src/components/document/ScalableText.vue';
import { useProfileStore } from 'src/stores/profile-store';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: { ScalableText },
  name: 'DocumentEditPage',
  setup(props, context) {
    const route = useRoute();
    const profileId = route.params.id as string;
    const profileStore = useProfileStore();
    profileStore.synchronizeById(profileId, true);

    return {};
  },
  methods: {
    tmp() {
      console.log(this.$q.screen.gt);
    },
  },
});
</script>
<style scoped>
.background-image {
  /* background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ8AAAB5CAMAAADRVtyNAAAA81BMVEX///8zMzM+hj1mn2QiIiIsLCyxsbFfm113r2V2rGR6smN0qWRypmN5tGRpoV5tomAbGxt6tWBubm55uF5jmllcmloeHh7v7+92ulvg4OCnp6eZvZgpKSl2vFlblVKuyq3T4tJRkEtxvlNdXV09PT1vv03y9/DMzMzJ28lVVVXY2Nienp6Tk5NERER8rHri7OKwsLBlZWWHh4e+vr5MTEwwfy+Br4DA1r96enoTExPFxcVpqFk6hDmOt41upGylxaSaw4yw0abW6NGIv3OZyoms1J/I4r98w2NlvECHtHtTpjgqfidfpUxgnlNQmURNkEdcqEloea8oAAAKA0lEQVR4nO2de3ubNhTGzS0kS+aQNOA5EBvnQomTQHOz4/rWdlvXLXGd7/9pJglsEEgYs8Qw0PtP8xhjqfohnaOjI1GrVUpb3Ke8q8CUoENDPN/KuxJMVB1KHKc9fMy7GkwUQT6cpBw28q4IE1GIDyR0xwgVUT4fjjOM47zrwhTXkg/Hidx93rVhiirEh+MG3byrwxQRxkdkc6GiCefDZkJFE+NTbDE+xRbjU2wxPsUW41NsMT7FFuNTbDE+xRbjU2wxPsUW41NsMT7FFuNTbDE+xRbjU2wxPsUW47OWGtdP6+cAuG6Ggvx0qnX4fLyveg7WtSQa2lNzrXvcL8PhxF63IE70iknPp3s7ULhK52Dd34iwlQzxKv091teDX7e3d2fjdfrQ/bmIimmk59O4U+A3xeqmAn88U5btdJ42keb7wYdff9ne3tmvz/TUBV0qQTEP6fgcG4b3FUm5Xa97l0TNJwVrqcs0Zujb778dHCA+O0f1Wb2fpqDGkxZKSZTChVL5fPY6tk9IvK6eGboSDQ5TipR164/TDx8WfOpAsz1z/YJW82neYo8OTDStmJ+3dS7GG8swrpPusf48Pfkt4LNbR4RWmCFiQcl8GneiFPuidlkhM9QNDE+kuc7pCdHfTwCeMJ99gGcfmKF2hoIS+HySiP1NGqzpZf5v1XgiPJ/L5/SBbIa+/XVxeoLz2TtCgPbquxQzlFgQhQ9meHAZYmL3LouuyM/n8jnVnuJmyP3jx8VpjM++D2hv9rdJKOg4uSASn+ahkkRUvCm9GfqcbA+85zQ6G/rzB8QT47PoQHt7u8MvVrQgbmVBMT7XSa4ElKSdlXqQa66yB36rYWbo+8WPiwsin/0A0M7wa7iglYaHwOc4DVFJIXTv0uhh9Yjjt0JghfR/flD51BeAdgGgv4NyrhKHKTKfu0G6Wwxuky22UTVTNgFot+UQZ807SXxCgJ7NxT2N9OUs+TTS3sIppfW0m+kGHZxPp/WSgs/ebuvZzlBOwCdljwMuZrX4SKSGwfi0Lqh8FoAAIf7x7fkQ61YpPpJ2+0Twg3E+L0l8/B7UGSXzkQySu53MR3y41AihhArxUc66xHlkiE+r1ZJPk/ggQHU+sf/AIHTjKe41JPER4drPfXw+UB0+Sz+6exu9gvFpzVby6STyER8+o2LOooTofCTND1ofa5F+Vxk+Uihecn+Dx/2Xy5ZWCyI4ofNpQUBHfAIfg1vS3oqEb6h8xGDRB3Rv7FJV/DcRi4U2aXxmkE8rkc/R/jyBj4Ed5HKFNTaNj1c3a+wto3exSzfv1j55K8IHn4ifYat1IT5oDHslxN98PgBQi0/gc45X4pK8forz0WDJbVUW1J6L3WNIayzF/9+Ujc8RAkTn02kddd6DT08VgGTVDe6RBmWO7mTtP8gLGNL5dBCeN+fjyJCPEOKjnZX7OJjMfACHFn1868wRojfnI+B8RKnsqwv/gU+d/0nn4+l9+RhaiQ2Pr2x8ECDQP07ofHjIZ/Q+41vHhXH3wWGpF348ZeMzhICAfZnTxzd+/g58LOggyAL81a1qZIdk4jMcDmc7cH7Dv9L58G/MR0F1MydqQvJJ+ZSJzwsENEIeWgKfOZ1PZH6KRWtofKSbz17p79YWRVRmPrynlxMqH9CBeFp8RwzFd85Txnck5bYSQxqmbHxehjOfD0/vPwAQlU8oPqpFL9Dj15JWuQN+m3jsKx2f15eXBR7+ZxKfedL6wgCuLwzWWl/gDKP8LjWmbHxefy758Al8+CQ+aCl07fU5Tryp1AG/mfj88xrg4X8m8BmZy3LeLP9AUlJtqyiJcD5aSj6jEB/+gM4nU/7BctsRLT9EEksdEsWE8dFu8YufwklRAZ/aK8ZnTuUzel7uZEifXzUIxq9LWm5edc6ZD/ExtFiy+X0ofzPExxKeQ4RGB2Q+o0c+tCP1Ku4JEPuGchiq3AM1fTRpW0WZtOQjacRw1vViT2GYT63W7zyGOhCRz+Noiv1S3JMmNXvE+ifsFVJKvrLgacFHPKf8bxu3fj6TiA8p+nNAaBjnwz86sYn+vbEim5rQg2vX0VyQpSphhjw+ia+v8h/8CJ+aNQ4Gudj6HD8xST+VuJGFMvtM2DJkiKWPYEM+hrJil9OWJJLei2C2Hn1CM5zPvEPbJdyg7uaR6C/Q6j4QUhIRH6X8fJRU2zOuDEMjuEz9uT/Ihfm0WkkRZooZSp523pO20BG3jZVOZ+kOe2gecqRn1dK9QW4W8Fl5SsVWfFMP6MErmvoqaoaqNU3NLmsCB7nRgg95X2NEgVPoN3WKN89FUoG1m+rFsjPK7ABC81/Q/vq9mOGxp1MzdkvzMDQbUlKuhHaDIxAqd/jBf1MbTHZg/9mZRq+4jirLqhMf8bqXvhlKf4xMcDaQVIld228oYIb47eGXKAZLh+kCsiCoenzVE5mh1YYH17EhGoPKLQK9gdzel2/Rz9oIzXiMIBE87jvOWDsFp3F9x9yCN5E9AVxUOE81vb/ix8M1WEfIS66XCeX3mr4Ae1IvwxGLTO8ha6rKghyyOsASwQ+m1Uq+Kap8w4N1F9czQ5VKXiumaOYmMEhM+ckzPCR3jWCGLDbebVYxwxO5jJkhd9rv077J9B6y5VV+mt+94OBn6e5Yt8YbqxyTm8bAeGYIIOxbdntqmuuems2UWW0weKVw0NqgB03BPzXbcWpuqgN/md5Cekr/GfjfOvDzbLvfNtts0roxYXzAyOW7Ae2x4zi9cdtcXPL41HTbsvpsQrQ5YXxUtWPW/BUGtCteVid+X/H51GxdNzdeyQoL4yMLqgnwQDiyCgQhwU9qAR+mzYrAxwEuw7hvuq7Z7kFC6BLjk4/ifIDHLS8XVYF7p9reH4xPHorzsVU01fEFRjrEhfHJR0Q+oVDcVJVRuIDxyUdxPhaMFQD7gwdCGZ98RPAPvAwRVZ448fkP04ZF4FPTVe9MFkhpsWTH+OQjEp+aO52g6Y+MTm5DHzE++YjIB8p17bbuwJ7UgoaI8clHhPlP+LWobs+fADE++SjOR1DDW4EswfO2GZ98FOfjyHJogdQCnzE++SnOZyqH56e67EUTGJ98RJmf9tq2aZr9NoyV9uAlxicfEfw3W12sL6A/JiiOwPjkI5J/7fbQ3EdG81OfCuOTj8jzH7evj3uOM57aiyAc45OPprIcnEoRnp/isnoC45OHTFUIluOofKYwh5FlveUhtEfBy4x3VTIfe4L2Nmy2Xky+bJQB7/Td/gSQiudWm87yAGumXDSFzprnTMc6ib9fmO3SylNWz1vxkYUoBvjyHjBbZXRyljt1BMFpRzjYAowlOGYuVWJaIdehb9tiykf2ZLETyEKOXbXenFB0uWA88+MJbRjeUVeda8W0WaEhTZVtZniKKrQfGCXIM8NTTE09OizaVlS5+mSil87w/Avt4FliBe1m6wAAAABJRU5ErkJggg=='); */
  background-image: url('https://loremflickr.com/1024/500');
  background-size: cover;
  background-position: center;
}
</style>
