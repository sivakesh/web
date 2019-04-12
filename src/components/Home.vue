<template>

  <v-container grid-list-md>
    <v-layout row wrap>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      
    </v-layout>
  </v-container>
</template>
<script>
import BlogCard from '@/components/BlogCard'
export default {
    name: 'Home',
    data() {
        return {
        }
    },
    components: {
        BlogCard
    }
}
</script>
<style scoped>

</style>

