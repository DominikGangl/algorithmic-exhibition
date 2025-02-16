export const videoPaths = {
    intro: {
        videoUrl: '/videos/intro.mov',
        nextOptions: [
            { id: 'video1', text: 'Ask about the system' },
            { id: 'video1', text: 'Ask about the avatar' }
        ]
    },
    video1: {
        videoUrl: '/videos/1.mov',
        nextOptions: [
            { id: 'video2', text: 'Ask about lie detection' },
            { id: 'video3', text: 'Ask about research foundation' }
        ]
    },
    video2: {
        videoUrl: '/videos/2.mov',
        nextOptions: [
            { id: 'video4', text: 'Ask about ethical assessment' },
            { id: 'video5', text: 'Ask about usage on migrants' }
        ]
    },
    video3: {
        videoUrl: '/videos/3.mov',
        nextOptions: [
            { id: 'video4', text: 'Ask about ethical assessment' },
            { id: 'video5', text: 'Ask about usage on migrants' }
        ]
    },
    video4: {
        videoUrl: '/videos/4.mov',
        nextOptions: [
            { id: 'video6', text: 'Ask about CEAS reform' },
            { id: 'video11', text: 'Ask about critics of iBorderCtrl' }
        ]
    },
    video5: {
        videoUrl: '/videos/5.mov',
        nextOptions: [
            { id: 'video6', text: 'Ask about redacted papers' },
            { id: 'video7', text: 'Ask about human border guards' }
        ]
    },
    video6: {
        videoUrl: '/videos/6.mov',
        nextOptions: [
            { id: 'video9', text: 'Ask about militarization' },
            { id: 'video10', text: 'Ask about accountability' }
        ]
    },
    video7: {
        videoUrl: '/videos/7.mov',
        nextOptions: [
            { id: 'video9', text: 'Ask about militarization' },
            { id: 'video10', text: 'Ask about accountability' }
        ]
    },
    video8: {
        videoUrl: '/videos/8.mov',
        nextOptions: [
            { id: 'video10', text: 'Ask about accountability' },
            { id: 'video11', text: 'Ask about critics' }
        ]
    },
    video9: {
        videoUrl: '/videos/9.mov',
        nextOptions: [
            { id: 'outro', text: 'Proceed to closing statement' },
        ]
    },
    video10: {
        videoUrl: '/videos/10.mov',
        nextOptions: [
            { id: 'outro', text: 'Proceed to closing statement' },
        ]
    },
    video11: {
        videoUrl: '/videos/11.mov',
        nextOptions: [
            { id: 'outro', text: 'Proceed to closing statement' },
        ]
    },
    // … add the remaining videos up to video14
    outro: {
        videoUrl: '/videos/outro.mov',
        nextOptions: [
            { id: 'intro', text: 'Restart' },
        ] // terminal video—no next options
    }
    // You can add more videos as needed.
};