	<div id="comments">
	<?php if ( post_password_required() ) : ?>
		<p class="nopassword"><?php _e( 'This post is password protected. Enter the password to view any comments.', 'stripesandblue' ); ?></p>
	</div>
	<?php
			return;
		endif;
	?>
	<?php if ( have_comments() ) : ?>
		<ol class="commentlist">
			<?php
				wp_list_comments( array( 'callback' => 'stripesandblue_comment' ) );
			?>
		</ol>
		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>		
		<nav id="comment-nav-below">
			<div class="nav-previous"><?php previous_comments_link( __( '&larr; 上一页', 'stripesandblue' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( __( '下一页 &rarr;', 'stripesandblue' ) ); ?></div>
		</nav>
		<?php endif; ?>
	<?php
		elseif ( ! comments_open() && ! is_page() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
	<?php endif; ?>
	<?php comment_form(); ?>
</div>