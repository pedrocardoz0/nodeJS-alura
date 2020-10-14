// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/alura-node$1.0.0/src/app/views/livros/lista/home.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    layout_template = marko_loadTemplate(require.resolve("./layout.marko")),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    await_tag = marko_loadTag(require("marko/src/taglibs/async/await-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  include_tag({
      _target: layout_template,
      cabecalho: {
          renderBody: function renderBody(out) {
            out.w("<h1>Testing Home</h1>");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");

  var livrosPromise = new Promise((resolve, reject) => {
     setTimeout(function() {
         resolve([
             {
                 titulo: 'Cangaceiro Node'
             },
             {
                 titulo: 'Node na prática'
             }
         ]);
     }, 1000);
  });

  await_tag({
      _dataProvider: livrosPromise,
      _name: "livrosPromise",
      renderBody: function renderBody(out, livros) {
        var for__4 = 0;

        marko_forEach(livros, function(livro) {
          var keyscope__5 = "[" + ((for__4++) + "]");

          out.w("<div>Título: " +
            marko_escapeXml(livro.titulo) +
            "</div>");
        });
      }
    }, out, __component, "3");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/alura-node$1.0.0/src/app/views/livros/lista/home.marko",
    tags: [
      "./layout.marko",
      "marko/src/taglibs/core/include-tag",
      "marko/src/taglibs/async/await-tag"
    ]
  };
