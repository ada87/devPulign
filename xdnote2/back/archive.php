<?php get_header();?>
<div id="content">
     <?php if (have_posts()) : ?>
	<header class="xd_search">
 	  <?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
 	  <?php /* If this is a category archive */ if (is_category()) { ?>
		分类：<span class="keyword"><?php single_cat_title(); ?></span> 下的杂货
 	  <?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
		标签：<span class="keyword"><?php single_tag_title(); ?></span> 下的杂货
 	  <?php /* If this is a daily archive */ } elseif (is_day()) { ?>
		在 <span class="keyword"><?php the_time('F jS, Y'); ?> 发布的</span> 
 	  <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
		在 <span class="keyword"><?php the_time('F, Y'); ?> 发布的</span> 
 	  <?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
		在 <span class="keyword"><?php the_time('Y'); ?> 发布的</span> 
	  <?php /* If this is an author archive */ } elseif (is_author()) { ?>
		Author Archive
 	  <?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
		Blog Archives
 	  <?php } ?>
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
			<div class="alignleft"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts' ) ); ?></div>
			<div class="alignright"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&rarr;</span>' ) ); ?></div>
		</div>
	<?php else : ?>
		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</div>
<?php get_sidebar();?>
<?php get_footer ();?>