<script lang="ts">
	export const ssr = false;
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core';
	import { commonmark } from '@milkdown/kit/preset/commonmark';
	import { gfm } from '@milkdown/kit/preset/gfm';
	import { history } from '@milkdown/kit/plugin/history';
	import './styles.css';
	import { upload } from '@milkdown/kit/plugin/upload';
	import { getMarkdown } from '@milkdown/kit/utils';
	import { clipboard } from '@milkdown/kit/plugin/clipboard';
	import type { Wiki } from '$lib/models/wikipage';

	let {markdown}: {markdown: Wiki} = $props();

	let editorInstance = null;

	function editor(dom) {
		const MakeEditor = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, markdown.text);
			})
			.use(commonmark)
			.use(gfm)
			.use(history)
			.use(clipboard)
			.use(upload)
			.create();
		MakeEditor.then((editor) => {
			editorInstance = editor
		});
	}
	export function saveMarkdown() {
		if (editorInstance) {
			const markdownResults = editorInstance.action(getMarkdown());
			return markdownResults;
		}
	}
</script>

<div use:editor />
