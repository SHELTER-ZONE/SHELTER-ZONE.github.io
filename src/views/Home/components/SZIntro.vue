<template>
    <section class="sz-intro">
        <article class="intro-content">
            <div class="shelter-img">
                <img src="@/assets/home/shelter.jpg" alt="">
            </div>
            <main>
                <p>SHELTER ZONE (SZ) 是一個技術交流的Discord群組,集結了對編程、3D模型、遊戲開發和數位藝術有興趣的朋友。</p>
                <p>群組的主要討論內容包括:</p>
                <ul class="list-disc pl-30px">
                    <li>Discord 機器人開發</li>
                    <li>各種編程語言項目交流</li>
                    <li>3D 建模、動畫製作</li>
                    <li>2D數位繪畫和圖片處理</li>
                    <li>遊戲設計與開發</li>
                </ul>
            </main>


            <!-- 我們期待您的加入,讓我們一起學習、交流、進步! -->
        </article>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="postcss">
.intro-content {
    @apply text-sub leading-[20px] tracking-[3px];
    @apply flex flex-col gap-[20px];
    @apply leading-[30px];
    @apply md:(flex-row items-center justify-center);
}

.shelter-img {
    @apply flex-shrink-0 overflow-hidden;
    @apply rounded-lg w-full m-auto;
    @apply md:(w-250px);

}

img {
    @apply w-full h-full object-fill;
}
</style>