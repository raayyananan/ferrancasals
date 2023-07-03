gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
    ease: 'none'
})

const lenis = new Lenis()

lenis.on('scroll', (e) => {
//   console.log(e)
})

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const urls = [
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-1.7a990f59.jpg&w=1920&q=75',
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-2.c90e1485.jpg&w=1920&q=75',
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-3.d3abb0f3.jpg&w=1920&q=75',
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-4.914cf2e8.jpg&w=1920&q=75',
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-5.d31888b6.jpg&w=1920&q=75',
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-6.a779b0e5.jpg&w=1920&q=75',
    'https://homepage-fawn-two.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-7.a21544b4.jpg&w=1920&q=75'
]

const itemNumbers = gsap.utils.toArray('.inner-panel .number'),
itemAmount = itemNumbers.length,
texts = gsap.utils.toArray('.text-container');
let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);


gsap.utils.toArray(".panel-container section").forEach((section, i) => {
    section.bg = section.querySelector(".bg"); 
  
    // Give the backgrounds some random images
    section.bg.style.backgroundImage = `url(${urls[i]})`;
    
    // the first image (i === 0) should be handled differently because it should start at the very top.
    // use function-based values in order to keep things responsive
    gsap.fromTo(section.bg, {
      backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
    }, {
      backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: () => i ? "top bottom" : "top top", 
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true // to make it responsive
      }
    });
  });

  const stl = gsap.timeline({
      scrollTrigger: {
          trigger: '.panel-container',
          scrub: 0.5,
          start: 'top top',
          end: 'bottom bottom',
        //   markers: true,
          pin: '.inner-panel',
          ease: 'none',
          snap: {
              snapTo: 1 / (itemAmount - 1),
              duration: 0.5
          },
          invalidateOnRefresh: true, // to make it responsive
          onUpdate: (self) => {
              const activeIndex = Math.round(self.progress * (itemAmount - 1));
        
              texts.forEach((text, index) => {
                  if (index === activeIndex) {
                      gsap.to(text, { opacity: 1, duration: 0.2 });
                  } else {
                      gsap.to(text, { opacity: 0, duration: 0.2 });
                  }
              });
          },
      }
  })
  

stl.to('.number-mover', {
    y: () => {
        return -document.querySelector('.number-mover').offsetHeight + itemNumbers[0].offsetHeight
    },
    ease: 'none'
})
stl.to('.progress-bar-active', {
    height: '100%',
    ease: 'none'
}, "<")



// sliding banner section

const slidingBannerNumbers = gsap.utils.toArray('.sliding-banner .step-header__number'),
slidingBannerNumbersLength = slidingBannerNumbers.length,
slidingBannerText = gsap.utils.toArray('.sliding-banner .slider-text'),
slidingBannerNumberContainers = gsap.utils.toArray('.sliding-banner .number-container');

const btl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sliding-banner',
        scrub: 0.5,
        start: 'top top',
        end: '+=3500',
      //   markers: true,
        pin: true,
        ease: 'none',
        snap: {
            snapTo: 1 / (slidingBannerNumbersLength - 1),
            duration: 0.5,
        },
        invalidateOnRefresh: true, // to make it responsive
        onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (slidingBannerNumbersLength - 1));
      
            slidingBannerNumbers.forEach((number, index) => {
                if (index === activeIndex) {
                    gsap.to(number, { fontWeight: 'bold', duration: 0.2 });
                    gsap.to(slidingBannerText[index], { opacity: 1, duration: 0.2 });

                    // if (window.innerWidth < 640) {
                    //     gsap.to('.number-bar-container', {
                    //         x: Math.max(0, 100 / index)
                    //     })
                    // }
                } else {
                    gsap.to(number, { fontWeight: 'normal', duration: 0.2 });
                    gsap.to(slidingBannerText[index], { opacity: 0, duration: 0.2 });
                }
            });
        },
    }
})

btl.to('.progress-active', {
    width: '100%',
    ease: 'none'
})
btl.to('.button--1', {
    padding: '0 120px'
},"<")






// the following animations are unnecessary for this demo, but they are included for illustration purposes
gsap.to('.section1 .column-text-inner', {
    y: 0,
    stagger: 0.125,
    ease: "quint.out",
    delay: 0.25,
    duration: 1.5
})

gsap.from('.section2 p, .section2 button', {
    scrollTrigger: {
        trigger: '.section2',
        start: 'top 25%'
    },
    stagger: 0.1,
    opacity: 0,
})

// console.log(itemNumbers[0].offsetHeight);