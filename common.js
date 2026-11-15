/* =========================================================
   QcDa Project 共通スクリプト (common.js)
   ヘッダー / ハンバーガーメニュー / フッターを全ページに描画する。
   アプリごとに変えるのは、下の QCDA_CONFIG だけ。
   各ページには次の3つの置き場を用意しておく:
     <div id="qcda-header"></div>  ... ページ最上部
     <div id="qcda-menu"></div>    ... どこでも (ヘッダーの直後が分かりやすい)
     <div id="qcda-footer"></div>  ... ページ最下部
   ========================================================= */

const QCDA_CONFIG = {
    appName: 'ドライブくじ',
    version: '2.1.0',
    repo: { user: 'qcda-dev', name: 'drive-lottery' }, // リリースノート(GitHub Releases)の取得元
    topPage: 'index.html',
    links: {
        guide: 'guide.html',
        releaseNotes: 'release-notes.html',
        contact: 'https://docs.google.com/forms/d/e/1FAIpQLSdlvIr5ehyy3dInl_XTkA5F64H7yFIigL2dzFW0IoXnl8ajdw/viewform?usp=dialog',
        about: 'https://qcda-dev.github.io/HP/',
        terms: 'https://qcda-dev.github.io/HP/terms-of-service.html',
        guidelines: 'https://qcda-dev.github.io/HP/community-guidelines.html'
    }
};

/* ---------- 共通ユーティリティ ---------- */
const QcDa = {
    // innerHTML に入れる文字列は必ずこれを通す (名前入力などの安全対策)
    escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    },
    config: QCDA_CONFIG
};

(function () {
    const c = QCDA_CONFIG;
    const e = QcDa.escapeHtml;
    const newTab = 'target="_blank" rel="noopener noreferrer"';

    const iconMenu = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    const iconClose = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';

    function render() {
        // ヘッダー: アプリ名(クリックでメイン画面) + ハンバーガーボタン
        const header = document.getElementById('qcda-header');
        if (header) {
            header.innerHTML =
                '<header class="qc-header"><div class="qc-header-inner">' +
                '<a href="' + e(c.topPage) + '" class="qc-app-name">' + e(c.appName) + '</a>' +
                '<button type="button" id="qc-menu-button" class="qc-menu-button" aria-label="メニューを開く" aria-controls="qc-menu" aria-expanded="false">' + iconMenu + '</button>' +
                '</div></header>';
        }

        // ハンバーガーメニュー: 5種類 (使い方ガイド / お問い合わせ / リリースノート / QcDa Projectとは / ver)
        const menu = document.getElementById('qcda-menu');
        if (menu) {
            menu.innerHTML =
                '<aside id="qc-menu" class="qc-menu" aria-hidden="true" aria-label="メニュー"><div class="qc-menu-inner">' +
                '<button type="button" id="qc-menu-close" class="qc-menu-close" aria-label="メニューを閉じる">' + iconClose + '</button>' +
                '<h2 class="qc-menu-title">メニュー</h2>' +
                '<nav>' +
                '<ul class="qc-menu-list">' +
                '<li><a href="' + e(c.links.guide) + '" ' + newTab + '>使い方ガイド</a></li>' +
                '<li><a href="' + e(c.links.contact) + '" ' + newTab + '>お問い合わせ</a></li>' +
                '<li><a href="' + e(c.links.releaseNotes) + '" ' + newTab + '>リリースノート</a></li>' +
                '</ul>' +
                '<hr class="qc-menu-divider">' +
                '<ul class="qc-menu-list">' +
                '<li><a href="' + e(c.links.about) + '" ' + newTab + '>QcDa Projectとは</a></li>' +
                '</ul>' +
                '<ul class="qc-menu-list qc-menu-sub">' +
                '<li><a href="' + e(c.links.terms) + '" ' + newTab + '>利用規約</a></li>' +
                '<li><a href="' + e(c.links.guidelines) + '" ' + newTab + '>コミュニティガイドライン</a></li>' +
                '</ul>' +
                '</nav>' +
                '<p class="qc-menu-ver">ver ' + e(c.version) + '</p>' +
                '</div></aside>' +
                '<div id="qc-overlay" class="qc-overlay" hidden></div>';
        }

        // フッター
        const footer = document.getElementById('qcda-footer');
        if (footer) {
            footer.innerHTML =
                '<footer class="qc-footer">' +
                '<p class="qc-footer-links">' +
                '<a href="' + e(c.links.terms) + '" ' + newTab + '>利用規約</a>' +
                '<a href="' + e(c.links.guidelines) + '" ' + newTab + '>コミュニティガイドライン</a>' +
                '</p>' +
                '<p>&copy; 2026 QcDa Project. All Rights Reserved.</p>' +
                '</footer>';
        }
    }

    function setupMenu() {
        const button = document.getElementById('qc-menu-button');
        const closeButton = document.getElementById('qc-menu-close');
        const menu = document.getElementById('qc-menu');
        const overlay = document.getElementById('qc-overlay');
        if (!button || !menu || !overlay) return;

        function open() {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            overlay.hidden = false;
            button.setAttribute('aria-expanded', 'true');
            closeButton.focus();
        }
        function close() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            overlay.hidden = true;
            button.setAttribute('aria-expanded', 'false');
        }

        button.addEventListener('click', open);
        closeButton.addEventListener('click', () => { close(); button.focus(); });
        overlay.addEventListener('click', close);
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && menu.classList.contains('is-open')) {
                close();
                button.focus();
            }
        });
    }

    render();
    setupMenu();
})();
