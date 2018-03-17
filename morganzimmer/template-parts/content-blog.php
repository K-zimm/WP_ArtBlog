<div class="blog-wrapper col-2-grid">
    <?php if(have_posts()) : while (have_posts() ) : the_post();?>
        <div class="single-post">
            <h1 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
            
            <?php the_post_thumbnail('blog-thumbnail'); ?>
            <div class="blog-info">
                <em>Posted on: <?php echo get_the_date(); ?></em>
                <h4>Written by: <?php the_author(); ?></h4>
            </div>
            <?php the_excerpt(); ?>
        </div>
    <?php endwhile; ?>
    <?php endif; ?>
</div>