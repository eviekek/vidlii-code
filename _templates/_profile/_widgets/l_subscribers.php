<section class="<? if ($Profile["subscriber_d"] == 1 && $Is_OWNER) : ?>hddn<? endif ?>" id="su2_l" module="s2_l">
    <div class="prbx_hd nm_hd">
        Subscribers (<a href="/user/<?= $Profile["displayname"] ?>/subscribers"><?= number_format($Profile["subscribers"]) ?></a>)
        <? if ($Is_OWNER) : ?>
            <div style="float: right;position:relative;top:3px;word-spacing:-4px;cursor:pointer">
                <img src="https://vidlii.kncdn.org/img/uaa1.png" onclick="c_move_up('su2_l')"> <img src="https://vidlii.kncdn.org/img/daa1.png" style="margin-right:2px" onclick="c_move_down('su2_l')"><img src="https://vidlii.kncdn.org/img/laa0.png"> <img src="https://vidlii.kncdn.org/img/raa1.png" onclick="move_hor('su2_l','su2_r')">
            </div>
        <? endif ?>
    </div>
    <div class="prbx_in nm_in prbx_user">
        <? $Count = 0 ?>
        <div class="us_box">
            <? foreach ($Subscribers as $Subscriber) : ?>
            <? $Count++ ?>
            <? if ($Count === 4) : ?></div><div class="us_box"> <? endif ?>
            <div>
                <?= user_avatar2($Subscriber["subscriber"],68,68,$Subscriber["avatar"],"pr_avt") ?><br>
                <a href="/user/<?= $Subscriber["subscriber"] ?>"><?= $Subscriber["subscriber"] ?></a>
            </div>
            <? endforeach ?>
            <? if ($Count >= 4) : ?></div> <? endif ?>
    </div>
</section>