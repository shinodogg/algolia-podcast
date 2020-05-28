const searchClient = algoliasearch(
  "V5NPILZLPB",
  "5ae92c67bd1fbf1b3003e428ab401b62"
);

const search = instantsearch({
  indexName: "algolia.fm",
  searchClient,
  searchFunction(helper) {
    const container = document.querySelector('#hits'); // `#hits` instead of `#results`
    container.style.display = helper.state.query === '' ? 'none' : '';

    helper.search();
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Algolia Search"
  })
);

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <a href="{{url}}">
          <div class="hit-title">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
          </a>
        </div>
      `,
    },
  })
]);

search.start();