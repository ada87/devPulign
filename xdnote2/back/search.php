<?php get_header();?>
<div id="content">
     <?php if (have_posts()) : ?>
		<header class="xd_search">
			和<span class="keyword"><?php echo $_REQUEST['s'] ?></span>相关的内容
		</header>
		<?php while (have_posts()) : the_post(); ?>
			<div class="post" id="post-<?php the_ID(); ?>">
                <div class="date">
				<?php the_time('M') ?>
				<span><?php the_time('j') ?></span>
                <?php the_time('Y') ?></div>
				<div class="entry">
				<h2 class="title"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
				<?php the_content( __( 'Read More >>', 'stripesandblue' ) ); ?>
				<div class="clear"></div>
                <?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'stripesandblue' ) . '</span>', 'after' => '</div>' ) ); ?>
				<div class="post-meta">
					<?php the_time('Y.m.j') ?> | <a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">&gt;查看全文&lt;</a> |  分类：<?php the_category('&nbsp;') ?>  | <?php comments_popup_link('留言', '1条留言', '%条留言','liuyan',''); ?> | <?php edit_post_link(' -> Edit', ''); ?><?php the_tags('标签: ', '&nbsp;'); ?> 
				</div>
				</div>
			</div>
		<?php endwhile; ?>
		<div class="navigation">
			<div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>
			<div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
		</div>
	<?php else : ?>
		<div class="xd_noresult">
			<h2 class="center">不好意思<span class="keyword"><?php echo $_REQUEST['s'] ?></span>已售馨。</h2>
			<p class="center">店主正在紧急补货中，敬请留意~_~</p>
			
		</div>
	<?php endif; ?>
</div>
<?php get_sidebar();?>
<?php get_footer ();?>