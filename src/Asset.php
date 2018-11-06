<?php

namespace solods\fblike;

use yii\web\AssetBundle;

class Asset extends AssetBundle
{
    public $sourcePath = '@vendor/solods/fblike/assets';

    public $css = [
        'css/fb-like-style-min.css'
    ];
    public $js = [
        'js/fb-like-min.js'
    ];
}