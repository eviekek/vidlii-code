<section class="<? if ($Profile["custom_d"] == 0 && $Is_OWNER) : ?>hddn<? endif ?>" id="cu_r" module="cu_r">
    <div class="prbx_hd nm_hd">
        <?= $Profile["displayname"] ?>
        <? if ($Is_OWNER) : ?>
            <div style="float: right;position:relative;top:3px;word-spacing:-4px;cursor:pointer">
                <? if ($Is_OWNER) : ?>
                <form action="/user/<?= $_USER->displayname ?>" method="POST" style="display:inline-block" onsubmit="document.getElementById('bbcodeval2').value = document.getElementById('bbtextarea2').value">
                    <div style="margin-right:10px;position:relative;bottom:3px" id="savebbcode2link">
                        <a href="javascript:void(0)" onclick="$('#savebbcode2link').css('display','none');$('#bbcustom2').css('display','none');$('#bbtextarea2').css('display','block');$('#save_bb2').css('display','inline-block');">Edit</a>
                    </div>
                    <input type="hidden" name="bbcode" id="bbcodeval2">
                    <input type="submit" name="save_custom" id="save_bb2" value="Save Box" style="position:relative;bottom:3.5px;right:8px;display:none">
                </form>
                <? endif ?>
                <img src="https://vidlii.kncdn.org/img/uaa1.png" onclick="c_move_up('cu_r')"> <img src="https://vidlii.kncdn.org/img/daa1.png" style="margin-right:2px" onclick="c_move_down('cu_r')"><img src="https://vidlii.kncdn.org/img/laa1.png" onclick="move_hor('cu_r','cu_l')"> <img src="https://vidlii.kncdn.org/img/raa0.png">
            </div>
        <? endif ?>
    </div>
    <div>
    </div>
    <div class="prbx_in nm_in" style="overflow:hidden;font-size:14px">
        <div id="bbcustom2"><?= custombb(nl2br(htmlspecialchars($Profile["custom"]))) ?></div>
        <? if ($Is_OWNER) : ?>
        <textarea maxlength="1024" id="bbtextarea2" style="display:none;width:100%;margin:-5px;padding:5px;resize: vertical" rows="8"><?= $Profile["custom"] ?></textarea>
        <? endif ?>
    </div>
</section>