<script>
	export let contenu;
	const { blocks = [] } = contenu;
</script>

<div id="contenu">
	{#each blocks as block}
		<div class="block mb-4 block-{block.type}">
			{#if block.type == 'paragraph'}
				<p bind:innerHTML={block.data.text} contenteditable="false" />
			{/if}
			{#if block.type == 'header' && block.data.level == 2}
				<h2>{block.data.text}</h2>
			{/if}
			{#if block.type == 'header' && block.data.level == 3}
				<h3>{block.data.text}</h3>
			{/if}
			{#if block.type == 'header' && block.data.level == 4}
				<h4>{block.data.text}</h4>
			{/if}

			{#if block.type == 'list'}
				<ul>
					{#each block.data.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
			{#if block.type == 'quote'}
				<blockquote>{block.data.text}</blockquote>
			{/if}
			{#if block.type == 'image'}
				<div class="w-full max-h-96 overflow-hidden">
					<img
						class="w-full h-full bg-cover object-cover"
						src={block.data.file.url}
						alt={block.data.caption}
					/>
					<blockquote>{block.data.caption}</blockquote>
				</div>
			{/if}
			{#if block.type == 'code'}
				<pre><code>{block.data.code}</code></pre>
			{/if}
			{#if block.type == 'delimiter'}
				<hr />
			{/if}
			{#if block.type == 'raw'}
				<div>{block.data.html}</div>
			{/if}
			{#if block.type == 'button'}
				<a class="btn" href={block.data.link}>{block.data.text}</a>
			{/if}
		</div>
	{/each}
</div>
