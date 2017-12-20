window.onload = function() {
    


    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        controlsTutorial: true,
        backgroundTransition: 'slide', 
        keyboard: true,
        parallaxBackgroundSize: '50% 50%',
    
        transition: 'slide', // none/fade/slide/convex/concave/zoom

        width: 960,
        height: 700,
    
        margin: 0.1,

        minScale: 0.2,
        maxScale: 1.5,

        dependencies: [
            { src: 'https://cdn.bootcss.com/reveal.js/3.5.0-beta/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'https://cdn.bootcss.com/reveal.js/3.5.0/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'https://cdn.bootcss.com/reveal.js/3.6.0/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'https://cdn.bootcss.com/reveal.js/3.4.1/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'https://cdn.bootcss.com/reveal.js/3.6.0/plugin/search/search.js', async: true },
            { src: 'https://cdn.bootcss.com/reveal.js/3.4.1/plugin/zoom-js/zoom.js', async: true },
            { src: 'https://cdn.bootcss.com/reveal.js/3.4.0/plugin/notes/notes.js', async: true },
        ]
    });

    Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        var state = Reveal.getState();
        if(state>1 && state<7){
            Reveal.configure({ center: false });
        }else{
            Reveal.configure({ center: true });
        }

    } );
    
};