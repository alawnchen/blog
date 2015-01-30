module Jekyll
  class ArchivePage < Page
    include Convertible

    attr_accessor :site, :pager, :name, :ext, :basename, :dir, :data, :content, :output

    # Initialize new ArchivePage
    # +site+ is the Site
    # +month+ is the month
    # +posts+ is the list of posts for the month
    #
    # Returns <ArchivePage>
    def initialize(site, month, posts)
      @site = site
      @month = month
      self.ext = '.html'
      self.basename = 'index'
      self.content = <<-EOS

<h1 class="category"><i class="fa fa-calendar fa-3"></i> {{ page.title }}</h1>
{% for post in page.posts %}
<article class="post type-post">
	<header class="entry-header">
		<h1 class="entry-title">
			{{ post.title }}
		</h1>
	</header>
	<div class="date">
      <span>{{ post.date |  date_to_long_string}}</span>
    </div>
	<div class="entry-content">
		{{post.excerpt}} 
		<p>
			<a class="pull-right" href="{{ post.url }}">[read more]</a>
		</p>
	</div>
</article>
{% endfor %}

EOS
      self.data = {
        'layout' => 'hellish-simplicity-default',
        'type' => 'archive',
        'title' => "Archive for #{month}",
        'posts' => posts
      }
    end

    # Add any necessary layouts
    # +layouts+ is a Hash of {"name" => "layout"}
    # +site_payload+ is the site payload hash
    #
    # Returns nothing
    def render(layouts, site_payload)
      payload = {
        "page" => self.to_liquid,
        "paginator" => pager.to_liquid
      }.merge(site_payload)
      do_layout(payload, layouts)
    end

    def url
      File.join("/", @month, "index.html")
    end
    
    def to_liquid
      self.data.merge({
                             "url" => self.url,
                             "content" => self.content
                           })
    end

    # Write the generated page file to the destination directory.
    # +dest_prefix+ is the String path to the destination dir
    # +dest_suffix+ is a suffix path to the destination dir
    #
    # Returns nothing
    def write(dest_prefix, dest_suffix = nil)
      dest = dest_prefix
      dest = File.join(dest, dest_suffix) if dest_suffix
      FileUtils.mkdir_p(dest)
      # The url needs to be unescaped in order to preserve the
      # correct filename
      path = File.join(dest, CGI.unescape(self.url))
      FileUtils.mkdir_p(File.dirname(path))
      File.open(path, 'w') do |f|
        f.write(self.output)
      end
    end

    def html?
      true
    end
  end
end