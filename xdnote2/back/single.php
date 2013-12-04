<?php get_header();?>
<div id="content">
      <?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
			<div class="post" id="post-<?php the_ID(); ?>">
                <div class="date">
				<?php the_time('M') ?>
				<span><?php the_time('j') ?></span>
                <?php the_time('Y') ?></div>
				<div class="entry">
				<h2 class="title"><?php the_title(); ?></h2>
				<?php the_content( __( 'Read More >>', 'stripesandblue' ) ); ?>
				<div class="clear"></div>
                <?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'stripesandblue' ) . '</span>', 'after' => '</div>' ) ); ?>

				<div class="post-meta">
					<?php the_time('Y.m.j') ?> | <a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">&gt;查看全文&lt;</a> |  分类：<?php the_category('&nbsp;') ?>  | <?php comments_popup_link('留言', '1条留言', '%条留言','liuyan',''); ?> | <?php edit_post_link(' -> Edit', ''); ?><?php the_tags('标签: ', '&nbsp;'); ?> 
				</div>
				</div>
			</div>
  			<?php comments_template(); // Get wp-comments.php template ?>
		<?php endwhile; ?>
                <div class="navigation">
                    <span class="alignleft"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link' ) . '</span> %title' ); ?></span>
					<span class="alignright"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link' ) . '</span>' ); ?></span>
                    <div class="clear"></div>
                </div>
	<?php else : ?>
		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</div>
<?php get_sidebar();?>
<?php get_footer ();?>