<template>
	<v-container grid-list-md>
		<v-layout row>
			<v-flex xs6>
				<h1 @click="Hiragana" style="cursor: pointer;">Hiragana</h1>
			</v-flex>
			<v-flex xs6 text-xs-right>
				<v-btn class="mr-4" @click="Tenten">〃</v-btn>
				<v-btn @click="Maru">〇</v-btn>
			</v-flex>
		</v-layout>

		<v-layout
			row
			v-for="(line, index) in show"
			:key="`${Date.now()}${index}`"
		>
			<v-flex v-for="(char, romaji) in line" :key="char">
				<v-card
					@click="Speak(romaji)"
					:color="
						romaji.search('[g|z|d|b|p|j]') != -1 ? 'primary' : null
					"
				>
					<v-card-title primary-title>{{ char }}</v-card-title>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
const audio = new Audio();

export default {
	data() {
		return {
			show: {},
			hiragana: {
				1: { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' },
				2: { ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ' },
				3: { sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ' },
				4: { ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と' },
				5: { na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の' },
				6: { ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ' },
				7: { ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も' },
				8: { ya: 'や', yu: 'ゆ', yo: 'よ' },
				9: { ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ' },
				10: { wa: 'わ', wo: 'を' },
				11: { n: 'ん' },
				12: { kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ' },
				13: { sha: 'しゃ', shu: 'しゅ', sho: 'しょ' },
				14: { cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ' },
				15: { nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ' },
				16: { hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ' },
				17: { mya: 'みゃ', myu: 'みゅ', myo: 'みょ' },
				18: { rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ' }
			},
			tenten: {
				1: { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' },
				2: { ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご' },
				3: { za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ' },
				4: { da: 'だ', ji: 'ぢ', zu: 'づ', de: 'で', do: 'ど' },
				5: { na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の' },
				6: { ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ' },
				7: { ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も' },
				8: { ya: 'や', yu: 'ゆ', yo: 'よ' },
				9: { ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ' },
				10: { wa: 'わ', wo: 'を' },
				11: { n: 'ん' },
				12: { gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ' },
				13: { ja: 'じゃ', ju: 'じゅ', jo: 'じょ' },
				14: { cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ' },
				15: { nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ' },
				16: { bya: 'びゃ', byu: 'びゅ', byo: 'びょ' },
				17: { mya: 'みゃ', myu: 'みゅ', myo: 'みょ' },
				18: { rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ' }
			},
			maru: {
				1: { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' },
				2: { ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ' },
				3: { sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ' },
				4: { ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と' },
				5: { na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の' },
				6: { pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ' },
				7: { ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も' },
				8: { ya: 'や', yu: 'ゆ', yo: 'よ' },
				9: { ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ' },
				10: { wa: 'わ', wo: 'を' },
				11: { n: 'ん' },
				12: { kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ' },
				13: { sha: 'しゃ', shu: 'しゅ', sho: 'しょ' },
				14: { cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ' },
				15: { nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ' },
				16: { hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ' },
				17: { mya: 'みゃ', myu: 'みゅ', myo: 'みょ' },
				18: { rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ' }
			}
		};
	},
	mounted() {
		this.show = this.hiragana;
	},
	methods: {
		Speak(char) {
			if (!audio.paused) audio.pause();
			audio.src = 'http://mina.mazii.net/db/alphabet/' + char + '.mp3';
			audio.play();
		},
		Tenten() {
			this.show = this.tenten;
		},
		Maru() {
			this.show = this.maru;
		},
		Hiragana() {
			this.show = this.hiragana;
		}
	}
};
</script>

<style lang="scss" scoped>
.v-card {
	cursor: pointer;
	&:hover {
		background-color: #4242427a;
	}
}
.primary {
	&:hover {
		background-color: #1976d2a6 !important;
	}
}
.v-card__title {
	justify-content: center;
	// font-size: 20px;
}
.opacity0 {
	// opacity: 0;
	display: none;
}
.v-btn {
	min-width: auto;
}
</style>
