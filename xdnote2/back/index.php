<?php get_header();?>
<div id="content">
	<?php while (have_posts()) : the_post(); ?>
		<?php if ( is_sticky() ) : ?>
		<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="date">
			<?php the_time('M') ?>
			<span><?php the_time('j') ?></span>
			<?php the_time('Y') ?></div>
			<div class="entry">
			<h3 class="sticky-format"><?php _e( 'Featured', 'stripesandblue' ); ?></h3>
			<h2 class="title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
			<?php the_excerpt(); ?>
			<div class="post-meta">
				<?php the_time('Y.m.j') ?> | <a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">&gt;查看全文&lt;</a> |  分类：<?php the_category('&nbsp;') ?>  | <?php comments_popup_link('留言', '1条留言', '%条留言','liuyan',''); ?> | <?php edit_post_link(' -> Edit', ''); ?><?php the_tags('标签: ', '&nbsp;'); ?> 
			</div>
			</div>
		</div>
		<?php else : ?>
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
		<?php endif; ?>
	<?php endwhile; ?>
	<div class="navigation">
		<div class="alignleft"><?php next_posts_link('&laquo; 更老的文章') ?></div>
		<div class="alignright"><?php previous_posts_link('更新的文章 &raquo;') ?></div>
	</div>
</div>
<?php get_sidebar();?>
<?php get_footer ();?>