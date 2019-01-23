<template>
	<v-container grid-list-md>
		<v-layout row>
			<v-flex xs6>
				<h1 @click="Katakana" style="cursor: pointer;">Katakana</h1>
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
			katakana: {
				1: { a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ' },
				2: { ka: 'カ', ki: 'キ', ku: 'ク', ke: 'ケ', ko: 'コ' },
				3: { sa: 'サ', shi: 'シ', su: 'ス', se: 'セ', so: 'ソ' },
				4: { ta: 'タ', chi: 'チ', tsu: 'ツ', te: 'テ', to: 'ト' },
				5: { na: 'ナ', ni: 'ニ', nu: 'ヌ', ne: 'ネ', no: 'ノ' },
				6: { ha: 'ハ', hi: 'ヒ', fu: 'フ', he: 'ヘ', ho: 'ホ' },
				7: { ma: 'マ', mi: 'ミ', mu: 'ム', me: 'メ', mo: 'モ' },
				8: { ya: 'ヤ', yu: 'ユ', yo: 'ヨ' },
				9: { ra: 'ラ', ri: 'リ', ru: 'ル', re: 'レ', ro: 'ロ' },
				10: { wa: 'ワ' },
				11: { n: 'ン' },
				12: { kya: 'キャ', kyu: 'キュ', kyo: 'キョ' },
				13: { sha: 'シャ', shu: 'シュ', sho: 'ショ' },
				14: { cha: 'チャ', chu: 'チュ', cho: 'チョ' },
				15: { nya: 'ニャ', nyu: 'ニュ', nyo: 'ニョ' },
				16: { hya: 'ヒャ', hyu: 'ヒュ', hyo: 'ヒョ' },
				17: { mya: 'ミャ', myu: 'ミュ', myo: 'ミョ' },
				18: { rya: 'リャ', ryu: 'リュ', ryo: 'リョ' }
			},
			tenten: {
				1: { a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ' },
				2: { ga: 'ガ', gi: 'ギ', gu: 'グ', ge: 'ゲ', go: 'ゴ' },
				3: { za: 'ザ', ji: 'ジ', zu: 'ズ', ze: 'ゼ', zo: 'ゾ' },
				4: { da: 'ダ', ji: 'ヂ', zu: 'ヅ', de: 'デ', do: 'ド' },
				5: { na: 'ナ', ni: 'ニ', nu: 'ヌ', ne: 'ネ', no: 'ノ' },
				6: { ba: 'バ', bi: 'ビ', bu: 'ブ', be: 'ベ', bo: 'ボ' },
				7: { ma: 'マ', mi: 'ミ', mu: 'ム', me: 'メ', mo: 'モ' },
				8: { ya: 'ヤ', yu: 'ユ', yo: 'ヨ' },
				9: { ra: 'ラ', ri: 'リ', ru: 'ル', re: 'レ', ro: 'ロ' },
				10: { wa: 'ワ' },
				11: { n: 'ン' },
				12: { gya: 'ギャ', gyu: 'ギュ', gyo: 'ギョ' },
				13: { ja: 'ジャ', ju: 'ジュ', jo: 'ジョ' },
				14: { cha: 'チャ', chu: 'チュ', cho: 'チョ' },
				15: { nya: 'ニャ', nyu: 'ニュ', nyo: 'ニョ' },
				16: { bya: 'ビャ', byu: 'ビュ', byo: 'ビョ' },
				17: { mya: 'ミャ', myu: 'ミュ', myo: 'ミョ' },
				18: { rya: 'リャ', ryu: 'リュ', ryo: 'リョ' }
			},
			maru: {
				1: { a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ' },
				2: { ka: 'カ', ki: 'キ', ku: 'ク', ke: 'ケ', ko: 'コ' },
				3: { sa: 'サ', shi: 'シ', su: 'ス', se: 'セ', so: 'ソ' },
				4: { ta: 'タ', chi: 'チ', tsu: 'ツ', te: 'テ', to: 'ト' },
				5: { na: 'ナ', ni: 'ニ', nu: 'ヌ', ne: 'ネ', no: 'ノ' },
				6: { pa: 'パ', pi: 'ピ', pu: 'プ', pe: 'ペ', po: 'ポ' },
				7: { ma: 'マ', mi: 'ミ', mu: 'ム', me: 'メ', mo: 'モ' },
				8: { ya: 'ヤ', yu: 'ユ', yo: 'ヨ' },
				9: { ra: 'ラ', ri: 'リ', ru: 'ル', re: 'レ', ro: 'ロ' },
				10: { wa: 'ワ' },
				11: { n: 'ン' },
				12: { kya: 'キャ', kyu: 'キュ', kyo: 'キョ' },
				13: { sha: 'シャ', shu: 'シュ', sho: 'ショ' },
				14: { cha: 'チャ', chu: 'チュ', cho: 'チョ' },
				15: { nya: 'ニャ', nyu: 'ニュ', nyo: 'ニョ' },
				16: { hya: 'ヒャ', hyu: 'ヒュ', hyo: 'ヒョ' },
				17: { mya: 'ミャ', myu: 'ミュ', myo: 'ミョ' },
				18: { rya: 'リャ', ryu: 'リュ', ryo: 'リョ' }
			}
		};
	},
	mounted() {
		this.show = this.katakana;
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
		Katakana() {
			this.show = this.katakana;
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
