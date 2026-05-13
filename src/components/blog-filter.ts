import { LitElement, css, html } from "lit";

class BlogFilter extends LitElement {
  static properties = {
    categories: { type: Array },
    category: { state: true },
    query: { state: true },
    resultCount: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .toolbar {
      display: grid;
      gap: 0.75rem;
      margin-block-end: 1.25rem;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      justify-content: space-between;
    }

    label {
      display: block;
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 700;
    }

    input {
      width: min(100%, 25rem);
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface);
      color: var(--text);
      font: inherit;
      padding: 0.75rem 0.9rem;
    }

    input:focus {
      border-color: var(--accent);
      outline: 3px solid var(--accent-soft);
    }

    .segments {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      padding: 0.25rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface-muted);
    }

    button {
      min-height: 2.25rem;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      font: inherit;
      font-weight: 800;
      padding: 0.35rem 0.7rem;
    }

    button[aria-pressed="true"] {
      background: var(--accent);
      color: #06211e;
    }

    .count {
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 700;
    }

    ::slotted([hidden]) {
      display: none !important;
    }

    @media (max-width: 720px) {
      .controls {
        align-items: stretch;
        flex-direction: column;
      }

      input {
        width: 100%;
      }
    }
  `;

  categories: string[] = [];
  private category = "전체";
  private query = "";
  private resultCount = 0;

  connectedCallback() {
    super.connectedCallback();

    const category = new URLSearchParams(window.location.search).get("category");

    if (category) {
      this.category = category;
    }
  }

  firstUpdated() {
    this.applyFilters();
  }

  private getPostElements() {
    const slot = this.shadowRoot?.querySelector("slot");

    if (!(slot instanceof HTMLSlotElement)) {
      return [];
    }

    return slot.assignedElements({ flatten: true }).flatMap((element) => {
      if (!(element instanceof HTMLElement)) {
        return [];
      }

      if (element.dataset.title) {
        return [element];
      }

      return [...element.querySelectorAll<HTMLElement>("[data-title]")];
    });
  }

  private handleSearch(event: Event) {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.query = target.value;
      this.applyFilters();
    }
  }

  private selectCategory(category: string) {
    this.category = category;
    this.applyFilters();
  }

  private applyFilters() {
    const normalizedQuery = this.query.trim().toLocaleLowerCase("ko-KR");
    const posts = this.getPostElements();
    let visibleCount = 0;

    for (const post of posts) {
      const title = post.dataset.title?.toLocaleLowerCase("ko-KR") ?? "";
      const description = post.dataset.description?.toLocaleLowerCase("ko-KR") ?? "";
      const tags = post.dataset.tags?.toLocaleLowerCase("ko-KR") ?? "";
      const category = post.dataset.category ?? "";
      const matchesCategory = this.category === "전체" || category === this.category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        title.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        tags.includes(normalizedQuery);
      const isVisible = matchesCategory && matchesQuery;

      post.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    }

    this.resultCount = visibleCount;
  }

  render() {
    const categories = ["전체", ...this.categories];

    return html`
      <div class="toolbar">
        <label>
          검색
          <input
            type="search"
            autocomplete="off"
            placeholder="글 제목, 설명, 태그"
            .value=${this.query}
            @input=${(event: Event) => this.handleSearch(event)}
          />
        </label>
        <div class="controls">
          <div class="segments" aria-label="카테고리 필터">
            ${categories.map(
              (category) => html`
                <button
                  type="button"
                  aria-pressed=${this.category === category}
                  @click=${() => this.selectCategory(category)}
                >
                  ${category}
                </button>
              `
            )}
          </div>
          <span class="count">${this.resultCount}개 글</span>
        </div>
      </div>
      <slot @slotchange=${() => this.applyFilters()}></slot>
    `;
  }
}

if (!customElements.get("blog-filter")) {
  customElements.define("blog-filter", BlogFilter);
}
