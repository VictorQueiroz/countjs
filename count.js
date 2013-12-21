/** -----\
 * Usage |
 ** -----/
 * >> ====\ To load multiple elements /=======\
 * >> <script>								  |_______________________________________
 * >>	var style = {style: 'margin-top: 2px; font-family: Arial', class: 'counter'}  |
 * >> 	count.elements(document.getElementsByTagName('textarea'), style);			  |
 * >> </script> ______________________________________________________________________|
 * >> _________/
 *   /
 *   \
 * >>/====\ To load one specific element /====\
 * >> <script>								  |_______________________________________
 * >>	var style = {style: 'margin-top: 2px; font-family: Arial', class: 'counter'}  |
 * >> 	count.element(document.getElementsByTagName('textarea')[0], style);			  |
 * >> </script> ______________________________________________________________________|
 * >> _________/ 
 */

(function(){

	/* The attributes should be like that: {class: 'form-control'}. */
	function setAttributes(element, obj)
	{
		if(obj instanceof Object && obj!=null)
			for(var i in obj)
			{ element.setAttribute(i, obj[i]) }
			return element;
	}

	count =
	{
		config: {max: 150},
		counter: function(element, attr)
		{
			attr==''||attr==null ? attr={} : attr=attr;
			var counter = document.createElement('div');
			setAttributes(counter, attr)
			count.refreshCounter(counter, element)
			return counter;
		},

		refreshCounter: function(counter, element){
			var max = element.getAttribute('max')==0 ||
								element.getAttribute('max')==null ?
									count.config.max :
									element.getAttribute('max');
			counter.innerHTML = element.value.length + ' / ' + max;
		},

		element: function (element, attr)
		{
			if(element)
			{
				try
				{
					/**
					 * Preventing max attribute from some error or bug.
					 *
					 * This part of the script set the max tag parameter
					 * to a number that the user had choosed.
					 */
					var max = element.getAttribute('max')
					if(max==null || max=='' || max==0)
						element.setAttribute('max', count.config.max)
					var counter = count.counter(element, attr);
					element.parentNode.insertBefore(counter, element.nextSibling)
					/* The function when the textarea suffer a change. */
					element.onkeypress=function()
					{
						if(
							this.value.length <= this.getAttribute('max') &&
							this.value.length <= count.config.max
						)
							count.refreshCounter(this.nextSibling, this)
						else
							this.value = this.value.substring(0, this.getAttribute('max'));
					}
				}						
				catch(e) {}
			}
		},

		elements: function(elements, attr)
		{
			if(elements instanceof Object || elements instanceof Array)
				for(var i in elements)
					count.element(elements[i], attr)
		}
	}

	if(!window.count) {window.count=count;}
})();