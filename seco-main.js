class Seco {
  constructor(tagName, attributes = {}, ...children) {
    this.tagName = tagName;
    this.attributes = attributes || {};
    this.children = children || [];
  }

  // RENDER THE TAG
  render() {
    const element = document.createElement(this.tagName);
    for (let attr in this.attributes) {
      if (attr.startsWith("on")) {
        const eventName = attr.substring(2).toLowerCase();
        element.addEventListener(eventName, this.attributes[attr]);
      } else if (attr === "style") {
        const styles = this.attributes[attr];
        for (let prop in styles) {
          element.style[prop] = styles[prop];
        }
      } else {
        element.setAttribute(attr, this.attributes[attr]);
      }
    }
    for (let child of this.children) {
      if (child instanceof Seco) {
        element.appendChild(child.render());
      } else {
        element.appendChild(document.createTextNode(child));
      }
    }
    return element;
  }

  // ADD EVENT LISTENER
  on(eventName, handler) {
    this.attributes["on" + eventName.toLowerCase()] = handler;
    return this;
  }

  // MAKE A STYLE INTO TAG
  style(styles) {
    this.attributes.style = styles;
    return this;
  }

  // MAKE A TEXT
  text(textContent) {
    this.children.push(textContent);
    return this;
  }

  // MAKE A TABLE
  table(data, style) {
    const headers = Object.keys(data[0]);

    const headerRow = new Seco(
      "tr",
      {},
      ...headers.map((header) => new Seco("th", {}, header))
    );

    const dataRows = data.map(
      (row) =>
        new Seco(
          "tr",
          {},
          ...headers.map((header) => new Seco("td", {}, row[header]))
        )
    );

    return new Seco(
      "table",
      { border: "1", style: style },
      headerRow,
      ...dataRows
    );
  }

  id(id) {
    this.attributes.id = id;
    return this;
  }

  // DEFINE CLASS TAG
  class(classes) {
    this.attributes.class = classes;
    return this;
  }

  // ADD CLASS TAG
  addClass(className) {
    if (this.attributes.class) {
      this.attributes.class += " " + className;
    } else {
      this.attributes.class = className;
    }
    return this;
  }

  // REMOVE CLASS TAG
  removeClass(className) {
    if (this.attributes.class) {
      const classes = this.attributes.class.split(" ");
      const index = classes.indexOf(className);
      if (index !== -1) {
        classes.splice(index, 1);
        this.attributes.class = classes.join(" ").trim();
      }
    }
    return this;
  }

  // ADD CHILDREN OF TAG
  addChildren(...newChildren) {
    this.children.push(...newChildren);
    return this;
  }

  // CLEAR CHILDREN OF TAG
  clearChildren() {
    this.children = [];
    return this;
  }

  // ADD ATTRIBUTE TAG
  attribute(attrs) {
    for (let attr in attrs) {
      this.attributes[attr] = attrs[attr];
    }
    return this;
  }

  // REMOVE ATTRIBUTE TAG
  removeAttribute(attrName) {
    delete this.attributes[attrName];
    return this;
  }

  // TOGGLE ATTRIBUTE TAG
  toggleAttribute(attrName) {
    if (this.attributes[attrName]) {
      delete this.attributes[attrName];
    } else {
      this.attributes[attrName] = true;
    }
    return this;
  }

  // DISABLE TAG
  disable() {
    this.attributes.disabled = true;
    return this;
  }

  // ENABLE TAG
  enable() {
    delete this.attributes.disabled;
    return this;
  }

  // SET VALUE
  setValue(value) {
    this.attributes.value = value;
    return this;
  }

  // SET CHECKED
  setChecked(checked) {
    this.attributes.checked = checked;
    return this;
  }

  updateById(id, attrs) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID '${id}' not found.`);
      return;
    }

    for (let attr in attrs) {
      if (attr === "class") {
        let existingClasses = element.getAttribute("class");
        if (existingClasses) {
          element.setAttribute("class", `${existingClasses} ${attrs[attr]}`);
        } else {
          element.setAttribute("class", attrs[attr]);
        }
      } else if (attr === "style") {
        for (let prop in attrs[attr]) {
          element.style[prop] = attrs[attr][prop];
        }
      } else if (attr === "text") {
        element.textContent = attrs[attr];
      } else if (attr === "class_remove") {
        element.classList.remove(attrs[attr]);
      } else if (attr === "children") {
        attrs[attr].forEach((child) => {
          if (child instanceof Seco) {
            element.appendChild(child.render());
          } else {
            element.appendChild(document.createTextNode(child));
          }
        });
      } else {
        element.setAttribute(attr, attrs[attr]);
      }
    }
  }
}

function tag(tagName, attributes = {}, ...children) {
  return new Seco(tagName, attributes, ...children);
}

function html(attributes = {}, ...children) {
  return new Seco("html", attributes, ...children);
}

function head(attributes = {}, ...children) {
  return new Seco("head", attributes, ...children);
}

function title(attributes = {}, ...children) {
  return new Seco("title", attributes, ...children);
}

function meta(attributes = {}, ...children) {
  return new Seco("meta", attributes, ...children);
}

function link(attributes = {}, ...children) {
  return new Seco("link", attributes, ...children);
}

function style(attributes = {}, ...children) {
  return new Seco("style", attributes, ...children);
}

function body(attributes = {}, ...children) {
  return new Seco("body", attributes, ...children);
}

function h1(attributes = {}, ...children) {
  return new Seco("h1", attributes, ...children);
}
function h2(attributes = {}, ...children) {
  return new Seco("h2", attributes, ...children);
}
function h3(attributes = {}, ...children) {
  return new Seco("h3", attributes, ...children);
}
function h4(attributes = {}, ...children) {
  return new Seco("h4", attributes, ...children);
}
function h5(attributes = {}, ...children) {
  return new Seco("h5", attributes, ...children);
}
function h6(attributes = {}, ...children) {
  return new Seco("h6", attributes, ...children);
}

function br(attributes = {}, ...children) {
  return new Seco("br", attributes, ...children);
}

function hr(attributes = {}, ...children) {
  return new Seco("hr", attributes, ...children);
}

function img(attributes = {}, ...children) {
  return new Seco("img", attributes, ...children);
}

function ul(attributes = {}, ...children) {
  return new Seco("ul", attributes, ...children);
}

function ol(attributes = {}, ...children) {
  return new Seco("ol", attributes, ...children);
}

function li(attributes = {}, ...children) {
  return new Seco("li", attributes, ...children);
}

function dl(attributes = {}, ...children) {
  return new Seco("dl", attributes, ...children);
}

function dt(attributes = {}, ...children) {
  return new Seco("dt", attributes, ...children);
}

function dd(attributes = {}, ...children) {
  return new Seco("dd", attributes, ...children);
}

function table(attributes = {}, ...children) {
  return new Seco("table", attributes, ...children);
}

function caption(attributes = {}, ...children) {
  return new Seco("caption", attributes, ...children);
}

function th(attributes = {}, ...children) {
  return new Seco("th", attributes, ...children);
}

function tr(attributes = {}, ...children) {
  return new Seco("tr", attributes, ...children);
}

function td(attributes = {}, ...children) {
  return new Seco("td", attributes, ...children);
}

function form(attributes = {}, ...children) {
  return new Seco("form", attributes, ...children);
}

function button(attributes = {}, ...children) {
  return new Seco("button", attributes, ...children);
}

function input(attributes = {}, ...children) {
  return new Seco("input", attributes, ...children);
}

function select(attributes = {}, ...children) {
  return new Seco("select", attributes, ...children);
}

function option(attributes = {}, ...children) {
  return new Seco("option", attributes, ...children);
}

function textarea(attributes = {}, ...children) {
  return new Seco("textarea", attributes, ...children);
}

function label(attributes = {}, ...children) {
  return new Seco("label", attributes, ...children);
}

function div(attributes = {}, ...children) {
  return new Seco("div", attributes, ...children);
}

function span(attributes = {}, ...children) {
  return new Seco("span", attributes, ...children);
}

function a(attributes = {}, ...children) {
  return new Seco("a", attributes, ...children);
}

function p(attributes = {}, ...children) {
  return new Seco("p", attributes, ...children);
}

function fieldset(attributes = {}, ...children) {
  return new Seco("fieldset", attributes, ...children);
}

function legend(attributes = {}, ...children) {
  return new Seco("legend", attributes, ...children);
}

function iframe(attributes = {}, ...children) {
  return new Seco("iframe", attributes, ...children);
}

function audio(attributes = {}, ...children) {
  return new Seco("audio", attributes, ...children);
}

function video(attributes = {}, ...children) {
  return new Seco("video", attributes, ...children);
}

function canvas(attributes = {}, ...children) {
  return new Seco("canvas", attributes, ...children);
}

function svg(attributes = {}, ...children) {
  return new Seco("svg", attributes, ...children);
}

function script(attributes = {}, ...children) {
  return new Seco("script", attributes, ...children);
}

function noscript(attributes = {}, ...children) {
  return new Seco("noscript", attributes, ...children);
}

function header(attributes = {}, ...children) {
  return new Seco("header", attributes, ...children);
}

function footer(attributes = {}, ...children) {
  return new Seco("footer", attributes, ...children);
}

function nav(attributes = {}, ...children) {
  return new Seco("nav", attributes, ...children);
}

function aside(attributes = {}, ...children) {
  return new Seco("aside", attributes, ...children);
}

function main(attributes = {}, ...children) {
  return new Seco("main", attributes, ...children);
}

function article(attributes = {}, ...children) {
  return new Seco("article", attributes, ...children);
}

function section(attributes = {}, ...children) {
  return new Seco("section", attributes, ...children);
}

function details(attributes = {}, ...children) {
  return new Seco("details", attributes, ...children);
}

function summary(attributes = {}, ...children) {
  return new Seco("summary", attributes, ...children);
}

function figure(attributes = {}, ...children) {
  return new Seco("figure", attributes, ...children);
}

function figcaption(attributes = {}, ...children) {
  return new Seco("figcaption", attributes, ...children);
}

function mark(attributes = {}, ...children) {
  return new Seco("mark", attributes, ...children);
}

function q(attributes = {}, ...children) {
  return new Seco("q", attributes, ...children);
}

function blockquote(attributes = {}, ...children) {
  return new Seco("blockquote", attributes, ...children);
}

function cite(attributes = {}, ...children) {
  return new Seco("cite", attributes, ...children);
}

function abbr(attributes = {}, ...children) {
  return new Seco("abbr", attributes, ...children);
}

function acronym(attributes = {}, ...children) {
  return new Seco("acronym", attributes, ...children);
}

function address(attributes = {}, ...children) {
  return new Seco("address", attributes, ...children);
}

function b(attributes = {}, ...children) {
  return new Seco("b", attributes, ...children);
}

function i(attributes = {}, ...children) {
  return new Seco("i", attributes, ...children);
}

function u(attributes = {}, ...children) {
  return new Seco("u", attributes, ...children);
}

function s(attributes = {}, ...children) {
  return new Seco("s", attributes, ...children);
}

function small(attributes = {}, ...children) {
  return new Seco("small", attributes, ...children);
}

function sub(attributes = {}, ...children) {
  return new Seco("sub", attributes, ...children);
}

function sup(attributes = {}, ...children) {
  return new Seco("sup", attributes, ...children);
}

function big(attributes = {}, ...children) {
  return new Seco("big", attributes, ...children);
}

function tt(attributes = {}, ...children) {
  return new Seco("tt", attributes, ...children);
}

function code(attributes = {}, ...children) {
  return new Seco("code", attributes, ...children);
}

function pre(attributes = {}, ...children) {
  return new Seco("pre", attributes, ...children);
}

function em(attributes = {}, ...children) {
  return new Seco("em", attributes, ...children);
}

function strong(attributes = {}, ...children) {
  return new Seco("strong", attributes, ...children);
}

function kbd(attributes = {}, ...children) {
  return new Seco("kbd", attributes, ...children);
}

function samp(attributes = {}, ...children) {
  return new Seco("samp", attributes, ...children);
}

function variable(attributes = {}, ...children) {
  return new Seco("var", attributes, ...children);
}

function dfn(attributes = {}, ...children) {
  return new Seco("dfn", attributes, ...children);
}

function ruby(attributes = {}, ...children) {
  return new Seco("ruby", attributes, ...children);
}

function rt(attributes = {}, ...children) {
  return new Seco("rt", attributes, ...children);
}

function rp(attributes = {}, ...children) {
  return new Seco("rp", attributes, ...children);
}

function bdo(attributes = {}, ...children) {
  return new Seco("bdo", attributes, ...children);
}

function wbr(attributes = {}, ...children) {
  return new Seco("wbr", attributes, ...children);
}

function progress(attributes = {}, ...children) {
  return new Seco("progress", attributes, ...children);
}

function meter(attributes = {}, ...children) {
  return new Seco("meter", attributes, ...children);
}

function time(attributes = {}, ...children) {
  return new Seco("time", attributes, ...children);
}

function output(attributes = {}, ...children) {
  return new Seco("output", attributes, ...children);
}

function datalist(attributes = {}, ...children) {
  return new Seco("datalist", attributes, ...children);
}

function keygen(attributes = {}) {
  return new Seco("keygen", attributes);
}

function menu(attributes = {}, ...children) {
  return new Seco("menu", attributes, ...children);
}

function command(attributes = {}) {
  return new Seco("command", attributes);
}

function summary(attributes = {}, ...children) {
  return new Seco("summary", attributes, ...children);
}

function get(id) {
  return document.querySelector(id);
}

class Ngestate {
  constructor(getter) {
    this.getter = getter;
  }

  set(value) {
    return (this.getter = value);
  }
}
