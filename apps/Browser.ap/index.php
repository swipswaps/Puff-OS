<?php
$url = $_GET['url'];
if($url) {
  if(stripos($url,"http") === false)$url = "https://$url";
  // if(stripos($url,"www") === false)$url = "www.$url";
} else $url = "https://www.google.com";
?>
<form action="" method="GET">
  <input type="text" name="url" id="url" placeholder="Enter a web address..." style="width: 100%;" value="<?php echo $url; ?>" required>
</form>
<div class="info"></div>
<hr/>
<?php
if($url) {
  if(filter_var($url,FILTER_VALIDATE_URL)) {
    echo "<iframe src='/apps/Browser.ap/webpage?url=$url' frameborder=0 style='width:100%;height:90vh;'>iframes not supported</iframe>";
  } else echo "Error: not a valid url";
}