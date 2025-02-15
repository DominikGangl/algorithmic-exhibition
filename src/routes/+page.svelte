<script>
	//@ts-nocheck
	import { fade } from 'svelte/transition';
	import { videoPaths } from '$lib/videoPaths';

	// The current video id. Starts as null until the user clicks “Start Tribunal.”
	let currentVideoId = null;
	// Reference to the video element.
	let videoEl;

	// Controls the black overlay opacity.
	let overlayVisible = false;
	// Controls the visibility of the "Please press the play button" message.
	let showPlayButtonMessage = false;
	// Controls the visibility of the next-path options.
	let showPathOptions = false;
	// Prevent multiple transitions from overlapping.
	let isTransitioning = false;

	// Helper function to pause execution.
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	// Runs the fade-out, switch, fade-in sequence.
	async function transitionTo(videoId) {
		if (isTransitioning) return;
		isTransitioning = true;

		// Fade out to black over 2 seconds.
		overlayVisible = true;
		await wait(2000);

		// Switch the video source and attempt to play.
		currentVideoId = videoId;
		playVideo();

		// Begin fading in: remove black overlay.
		overlayVisible = false;

		// Set up the timer for path options.
		let optionsPromise = Promise.resolve();
		if (videoPaths[videoId].nextOptions.length > 0) {
			showPathOptions = false;
			optionsPromise = wait(10000);
		} else {
			showPathOptions = true;
		}

		// Show the "Please press the play button" overlay.
		showPlayButtonMessage = true;
		// Let it fade in over 1s, remain for 1s static (total 2s so far)
		await wait(2000);
		// Then remove it (it will fade out over 1s).
		showPlayButtonMessage = false;

		// Wait until the 10s timer finishes, then show the next-path options (if any).
		await optionsPromise;
		if (videoPaths[videoId].nextOptions.length > 0) {
			showPathOptions = true;
		}

		isTransitioning = false;
	}

	// Start the tribunal by switching to the intro video.
	function startTribunal() {
		transitionTo('intro');
	}

	// Attempt to play the video.
	function playVideo() {
		if (videoEl) {
			videoEl.play().catch((error) => {
				console.error('Playback prevented:', error);
			});
		}
	}

	// When a next option is selected, trigger the transition.
	function handleOptionClick(option) {
		transitionTo(option.id);
	}
</script>

<!-- The overall container is sized for a 1080x1920-like screen -->
<main class="relative flex h-screen w-screen flex-col">
	<button
		class="absolute top-3 left-3 z-20 rounded-md border-2 border-gray-300 px-4 py-2 text-gray-100 hover:bg-gray-900"
		on:click={() => window.location.reload()}
	>
		Restart
	</button>

	{#if !currentVideoId}
		<!-- Initial screen: only show the "Start Tribunal" button -->
		<div class="flex h-screen flex-grow items-center justify-center bg-black text-5xl">
			<button
				on:click={startTribunal}
				class="w-[40%] rounded-xl border-2 border-gray-300 px-8 py-8 text-gray-100 hover:bg-gray-900"
			>
				Start Tribunal
			</button>
		</div>
	{:else}
		<!-- Video player occupies 95vh, button container occupies 5vh -->
		<div class="flex h-[95vh] items-end justify-center bg-black">
			<video
				bind:this={videoEl}
				src={videoPaths[currentVideoId].videoUrl}
				class="z-0 h-full w-auto object-cover"
				playsinline
				controls
				on:click={playVideo}
			>
				Your browser does not support the video tag.
			</video>
		</div>

		{#if videoPaths[currentVideoId].nextOptions.length > 0 && showPathOptions}
			<!-- Buttons container for next options; fades in over 1s -->
			<div
				transition:fade={{ duration: 1000 }}
				class="flex h-[5vh] items-center justify-around bg-black pb-3"
			>
				{#each videoPaths[currentVideoId].nextOptions as option}
					<button
						on:click={() => handleOptionClick(option)}
						class="w-[46%] rounded-xl border-2 border-gray-300 px-8 py-6 text-2xl text-gray-100 hover:bg-gray-900"
					>
						{option.text}
					</button>
				{/each}
			</div>
		{/if}
	{/if}

	<!-- Black Overlay: always rendered and covers the screen.
	     Its opacity is controlled by the overlayVisible variable.
	     The fade transition lasts 2 seconds via Tailwind's duration-2000 class. -->
	<div
		class="pointer-events-none absolute inset-0 bg-black transition-opacity duration-2000"
		class:opacity-100={overlayVisible}
		class:opacity-0={!overlayVisible}
	></div>

	<!-- "Please press the play button" Message Overlay:
	     Uses Svelte's fade transition (1s for both fade in and fade out).
	     It will be visible for about 3 seconds total. -->
	{#if showPlayButtonMessage}
		<div
			transition:fade={{ duration: 1000 }}
			class="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl text-white"
		>
			Please press the play button
		</div>
	{/if}
</main>

<style>
	button:hover {
		cursor: pointer;
	}
</style>
