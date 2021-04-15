$("#Description_id").on("click",function(){
    $(".thumbnail").toggleClass("completed");
    $(this).toggleClass("active");
    $(".well").toggleClass("completed");
    $("#Comments_id").toggleClass("active");
});

$("#Comments_id").on("click",function(){
    $(".well").toggleClass("completed");
    $(this).toggleClass("active");
    $(".thumbnail").toggleClass("completed");
    $("#Description_id").toggleClass("active");
});

/**
 * <div id="Map_id" class="list-group-item">Map</div>
 * 
 * $("#Map_id").on("click",function(){
    $(".map").toggleClass("completed");
    $(this).toggleClass("active");
}); */