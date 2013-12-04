<?php get_header();?>
<div id="content">
      <?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
			<div class="post" id="post-<?php the_ID(); ?>">
				<div class="entry">
					<h2 class="title"><?php the_title(); ?></h2>
					<?php the_content( __( 'Read More >>', 'stripesandblue' ) ); ?>
					<div class="clear"></div>
                    <?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'stripesandblue' ) . '</span>', 'after' => '</div>' ) ); ?>
				</div>
			</div>
  			<?php comments_template(); // Get wp-comments.php template ?>
		<?php endwhile; ?>
	<?php else : ?>
		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</div>
<?php get_sidebar();?>
<?php get_footer ();?>