<script id="likes-template" type="text/x-handlebars-template">
<p class="help text-info">*Click the Like buttons to "unlike" them.</p>
<ul id="likeHolder">
	{{#each like}}
	<li class="like">
		<h3 class="title">{{this.name}}</h3>
		<time><em> Liked on: </em>{{this.created_time}}</time>
		<div class="likebtn tip" data-toggle="tooltip" data-placement="top" title="Click the 'grayed' out like-button to unlike.">
			
			<fb:like-box href="http://facebook.com/{{this.id}}" width="292" height="90" show_faces="false" stream="false" header="true"></fb:like-box>

		</div>
	</li>
	{{/each}}
</ul>
</script>
