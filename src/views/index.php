<div id="fb-like-slider" class="bottom-right social  light" style="color: rgb(91, 100, 106); font-family: &quot;Open Sans&quot;, sans-serif; background-color: rgb(255, 255, 255);">
    <div class="fblike-header" style="background-color: <?= $colour ?>"></div>
    <div class="slider-content">

        <div class="fblike-content-wrapper">
            <div class="fblike-inner-content">
                <div class="fblike-text-wrapper">
                    <div class="fblike-headline-text"><?= $headlineText ?></div>
                    <div class="fblike-secondary-text"><?= $secondaryText ?></div>
                </div>
                <div class="fblike-social-wrapper fblike-facebook-wrapper">
                    <span class="fb-like fb_iframe_widget"
                          data-href="https://www.facebook.com/<?= $fb ?>/"
                          data-layout="button_count"
                          data-action="like"
                          data-show-faces="false"
                          data-width="200"
                          data-share="false"
                          fb-xfbml-state="rendered"
                          fb-iframe-plugin-query="action=like&amp;app_id=&amp;container_width=100&amp;href=https%3A%2F%2Fwww.facebook.com%2F<?= $fb ?>%2F&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;share=false&amp;show_faces=false">
                        <span style="vertical-align: bottom; width: 200px; height: 20px;">
                            <iframe name="f193b05313c978c" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no"
                                    title="fb:like Facebook Social Plugin"
                                    src="https://www.facebook.com/plugins/like.php?action=like&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FLJ9CfGDsgQ7.js%3Fversion%3D42%23cb%3Df13994e734140a8%26domain%3D<?= $fb ?>%26origin%3Dhttps%3A%2F%2F<?= $fb ?>%2Fforum%2Ff1bf45fa40d69fc%26relation%3Dparent.parent&amp;container_width=0&amp;href=https%3A%2F%2Fwww.facebook.com%2F<?= $fb ?>%2F&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;share=false&amp;show_faces=false"
                                    style="border: none; visibility: visible; width: 200px; height: 20px;" class="">

                            </iframe>
                        </span>
                    </span>
                    <span id="fb-root" class=" fb_reset">
                        <div style="position: absolute; top: -10000px; height: 0px; width: 0px;"><div></div></div>
                        <div style="position: absolute; top: -10000px; height: 0px; width: 0px;"><div></div></div>
                    </span>

                </div>
            </div>
        </div>
        <br class="image-clear-fix">
    </div>
    <div class="fblike-logo-wrapper animated">
        <?= $logo ?>
    </div>
</div>