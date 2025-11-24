<script setup lang="ts">
	// router linkを使う
	import { RouterLink } from 'vue-router'
	import { RouterView } from 'vue-router'
</script>

<template>
	<div>
		<h1>Practice</h1>
		<RouterLink to="/about">About</RouterLink>
	</div>
</template>