function showActionsPanel() {
	if (!isActionsOpen) {
		$('#actions-hide img').removeClass('rotateLeft').addClass('rotateRight');
		$('#actions').animate({
			width: "+=" + actionsWidth,
		});
		isActionsOpen = true;
	}
}

function hideActionsPanel() {
	if (isActionsOpen) {
		$('#actions-hide img').removeClass('rotateRight').addClass('rotateLeft');
		$('#actions').animate({
			width: "-=" + actionsWidth,
		});
		isActionsOpen = false;
	}
}


(function() {


})()
