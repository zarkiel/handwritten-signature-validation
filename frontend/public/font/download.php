<?php
$items = '/cf-fonts/s/poppins/5.0.11/latin/400/normal.woff2
/cf-fonts/s/poppins/5.0.11/devanagari/400/normal.woff2
/cf-fonts/s/poppins/5.0.11/latin-ext/400/normal.woff2
/cf-fonts/s/poppins/5.0.11/latin/500/normal.woff2
/cf-fonts/s/poppins/5.0.11/devanagari/500/normal.woff2
/cf-fonts/s/poppins/5.0.11/latin-ext/500/normal.woff2
/cf-fonts/s/poppins/5.0.11/latin-ext/700/normal.woff2
/cf-fonts/s/poppins/5.0.11/devanagari/700/normal.woff2
/cf-fonts/s/poppins/5.0.11/latin/700/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/cyrillic-ext/400/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/cyrillic/400/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/latin-ext/400/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/greek-ext/400/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/greek/400/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/latin/400/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/latin-ext/500/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/cyrillic-ext/500/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/greek/500/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/cyrillic/500/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/latin/500/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/greek-ext/500/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/greek-ext/700/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/latin/700/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/latin-ext/700/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/greek/700/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/cyrillic/700/normal.woff2
/cf-fonts/s/ubuntu/5.0.11/cyrillic-ext/700/normal.woff2';


$items = explode("\n", $items);
$items = array_map('trim', $items);
$items = array_filter($items);
$items = array_unique($items);
$items = array_values($items);
foreach($items As $item){
    $chunks = explode('/', $item);
    $name = $chunks[3]."-".$chunks[5]."-".$chunks[6]."-".$chunks[7];
    echo $item." -> ./assets/font/".$name."\n";
    //$data = file_get_contents("https://preview.themeon.net".$item);
    //file_put_contents($name, $data);
}