<script lang="ts">
	let pitch = 0
	let record = false
	let rawPitches: number[] = []
    let stream: MediaStream;

	const recordPitch = async () => {
		stream = await navigator.mediaDevices.getUserMedia({ audio: true })

		const audioContext = new AudioContext()
		const analyser = audioContext.createAnalyser()
		const source = audioContext.createMediaStreamSource(stream)
		source.connect(analyser)

		analyser.fftSize = 2 ** 10

		const audioData = new Float32Array(analyser.fftSize)
		const corrolatedSignal = new Float32Array(analyser.fftSize)
		let localMaxima = new Array(10)

		function getAutocorrolatedPitch() {
			// First: autocorrolate the signal

			let maximaCount = 0

			for (let l = 0; l < analyser.fftSize; l++) {
				corrolatedSignal[l] = 0
				for (let i = 0; i < analyser.fftSize - l; i++) {
					corrolatedSignal[l] += audioData[i] * audioData[i + l]
				}
				if (l > 1) {
					if (
						corrolatedSignal[l - 2] - corrolatedSignal[l - 1] < 0 &&
						corrolatedSignal[l - 1] - corrolatedSignal[l] > 0
					) {
						localMaxima[maximaCount] = l - 1
						maximaCount++
						if (maximaCount >= localMaxima.length) break
					}
				}
			}

			// Second: find the average distance in samples between maxima

			let maximaMean = localMaxima[0]

			for (let i = 1; i < maximaCount; i++) maximaMean += localMaxima[i] - localMaxima[i - 1]

			maximaMean /= maximaCount

			return audioContext.sampleRate / maximaMean
		}

		const getFrequencyData = () => {
			analyser.getFloatTimeDomainData(audioData)
			const currentPitch = getAutocorrolatedPitch()
			if (currentPitch) {
				rawPitches.push(currentPitch)
			}

			if (record) {
				requestAnimationFrame(() => getFrequencyData())
			}
		}

		getFrequencyData()
	}

	setInterval(() => {
		if (record) {
			console.log(rawPitches)
			pitch = rawPitches.reduce((a, b) => a + b, 0) / rawPitches.length
		}
	}, 250)

	function toggleRecord() {
		if (record) {
			record = false
            stream.getTracks().forEach(t => t.stop())
			return
		}

		rawPitches = []

		record = true
		recordPitch()
	}
</script>

<div class="container">
	<div class="pitchContainer">
		<h1>Pitch: {pitch}</h1>
	</div>

	<button on:click={toggleRecord}>{record ? 'Stop' : 'Start'} recording</button>
</div>

<style>
	:global(body) {
		margin: 0;
	}
	:global(*) {
		box-sizing: border-box;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		justify-content: space-between;
		padding: 1rem;
	}

    @supports (height: 100dvh) {
        .container {
            height: 100dvh;
        }
    }

	.container .pitchContainer {
		display: flex;
		align-items: center;
		flex-grow: 5;
	}

	.container button {
		min-width: 98vw;
		max-width: 500px;
		font-size: 2rem;
		flex-grow: 1;
	}
</style>
