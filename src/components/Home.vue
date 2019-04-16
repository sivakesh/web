<template>

  <v-container grid-list-md v-if="posts">
    <v-layout row wrap >
      <BlogCard v-for="p in posts" :key="p.id" :post="p"/>
    </v-layout>
  </v-container>
</template>
<script>
import BlogCard from '@/components/BlogCard'
export default {
    name: 'Home',
    data() {
        return {
          posts: [],
          postsRef: firebase.database().ref('posts'),
        }
    },
    methods: {
      addListeners() {
        this.postsRef.on('child_added', (snapshot) => {
          this.posts.push(snapshot.val())
        })
        console.log(this.posts)
      }
    },
    created() {
      this.addListeners()
    },
    components: {
        BlogCard
    }
}
</script>
<style scoped>

</style>

