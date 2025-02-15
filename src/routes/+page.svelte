<script>
	//@ts-nocheck
	import { videoPaths } from '$lib/videoPaths';

	// The current video id. Starts as null until the user clicks “Start Tribunal.”
	let currentVideoId = null;
	// Reference to the video element.
	let videoEl;

	// Controls the black overlay opacity.
	let overlayVisible = false;
	// Prevent multiple transitions from overlapping.
	let isTransitioning = false;

	// Helper function to pause execution.
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	// Runs the fade-out, switch, fade-in sequence.
	async function transitionTo(videoId) {
		if (isTransitioning) return;
		isTransitioning = true;
		// Fade out (to black)
		overlayVisible = true;
		await wait(1000); // wait 1s for fade-out
		// Change the video source
		currentVideoId = videoId;
		playVideo();
		// Fade in (back from black)
		overlayVisible = false;
		await wait(1000); // wait 1s for fade-in
		isTransitioning = false;
	}

	// Start the tribunal by switching to the intro video.
	function startTribunal() {
		transitionTo('intro');
	}

	// Attempt to play the video. (User-initiated so playback should work.)
	function playVideo() {
		if (videoEl) {
			videoEl.play().catch((error) => {
				console.error('Playback prevented:', error);
			});
		}
	}

	// When a next option is selected, trigger the fade transition to the new video.
	function handleOptionClick(option) {
		transitionTo(option.id);
	}
</script>

<!-- The overall container is sized for a 1080x1920-like screen -->
<main class="relative flex h-screen w-screen flex-col">
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
		<!-- Video player occupies 90vh, button container occupies 10vh -->
		<div class="flex h-[95vh] items-end justify-center bg-black">
			<video
				bind:this={videoEl}
				src={videoPaths[currentVideoId].videoUrl}
				class="h-full w-auto object-cover"
				playsinline
				controls
				on:click={playVideo}
			>
				Your browser does not support the video tag.
			</video>
		</div>

		{#if videoPaths[currentVideoId].nextOptions.length > 0}
			<!-- Buttons container (10vh high) -->
			<div class="flex h-[5vh] items-center justify-around bg-black pb-3">
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

	<!-- Overlay: always rendered and covers the screen.
	     Its opacity is controlled by the overlayVisible variable. -->
	<div
		class="pointer-events-none absolute inset-0 bg-black transition-opacity duration-1000"
		class:opacity-100={overlayVisible}
		class:opacity-0={!overlayVisible}
	></div>
</main>
