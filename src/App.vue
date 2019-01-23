<template>
	<v-app dark>
		<v-toolbar app fixed flat>
			<v-toolbar-title class="headline text-uppercase hidden-xs-only">
				<router-link to="/" class="font-weight-light"
					>CPJapanese</router-link
				>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn flat to="/" class="hidden-sm-and-up">HOME</v-btn>
				<v-btn flat to="/hiragana">Hiragana</v-btn>
				<v-btn flat to="/katakana">Katakana</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content> <router-view /> </v-content>
	</v-app>
</template>

<style lang="scss" scoped>
a {
	color: white;
	text-decoration: none;
}
</style>
